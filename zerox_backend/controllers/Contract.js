const jwt = require("jsonwebtoken");
const Contract = require("../models/Contracts");
const Act = require("../models/Acts");
const Notification = require("../models/Notifications");
const crypto = require("node:crypto");
const User = require("../models/Users");
const axois = require("axios");
const { FM } = require("./Notifications");

// const dates = +new Date()
// const secret = process.env.SECRET

let messages = [
  "Ma’lumotlarni ko’rishga ruxsat so’rash to’g’risida",
  "Qarz shartnomasini rasmiylashtirish to’g’risida",
  "Qarz muddati uzaytirilganligi to’g’risida",
  "Muddatni uzaytirish bo`yicha so`rovnoma to'g'risida",
  "Qarz muddatini uzaytirish so’ralganligi to’g’risida",
  "Qarzni qaytarish talab qilinganligi to’g’risida",
  "Qarz muddatini uzaytirish so’ralganligi to’g’risida",
];

let option = (user, index = 0) => {
  return {
    token: user.rtf_token,
    notification: {
      body: "Yangi bildirishnoma",
      title: "ZeroX",
    },
  };
};
exports.create = async (req, res) => {
  try {
    const date = new Date();
    const endDate = new Date(req.body.end_date);
    if (date > endDate) {
      return res.status(200).json({ success: false, msg: "date" });
    }
    const thisDay = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    let num = await Contract.query().where("date", thisDay);
    if (num.length == null) {
      num == 0;
    } else {
      num = num.length;
    }
    const number = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}-${num + 1}`;

    const dd = new Date().getTime();
    const secret =
      "5b8485824427868570617c898d45550a86b1ab393a136bcfcfd7a15985f206ba";
    const sd = dd.toString();
    const hash = crypto.createHmac("sha256", secret).update(sd).digest("hex");
    let bb;
    let balanc;
    let sds;
    let amo = 100000;
    let cur_amount;
    const usersss = await User.query().findOne("id", req.body.creditor);

    if (req.body.currency == "USD") {
      let ussd;
      await axois
        .get("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
        .then((res) => {
          ussd = res.data[0].Rate;
          bb = Math.floor(req.body.amount * ussd * 0.001);
          cur_amount = req.body.amount * ussd;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      bb = Math.floor(req.body.amount * 0.001);
      cur_amount = req.body.amount;
    }
    if (cur_amount <= 1000000) {
      sds = 1000;
    } else if (cur_amount >= 100000000) {
      sds = amo;
    } else {
      sds = bb;
    }
    if (balanc < 0 && usersss.cnt == 0) {
      return res
        .status(400)
        .json({ success: false, err: "You have not enough money" });
    }
    console.log(req.body.amount);
    Contract.query()
      .insert({
        date: thisDay,
        number,
        uid: hash,
        debitor: req.body.debitor,
        amount: req.body.amount,
        currency: req.body.currency,
        end_date: req.body.end_date,
        reciver: req.body.res,
        sender: req.body.sender,
        create_time: new Date(),
        creditor: req.body.creditor,
        status: 0,
      })
      .then(async (response) => {
        await Notification.query().insert({
          contract: response.id,
          token: sds,
          status: 0,
          type: 0,
          time: new Date(),
          timer: new Date(),
          reciver: req.body.reciver,
          debitor: req.body.debitor,
          creditor: req.body.creditor,
        });
        const userss = await User.query().findOne("id", req.body.reciver);

        FM.send(option(userss, 1), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
        return res.status(201).json({ success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.query().orderBy("id", "desc");
    return res.status(200).json({ success: true, data: contracts });
  } catch (error) {
    console.log(error);
  }
};
exports.debQarz = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  let dss;

  if (req.query.start != "0" && req.query.end != "0") {
    dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`;
  } else {
    dss = " ";
  }
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    const data = await knex.raw(
      `SELECT c.id,
	  a.residual_amount,
	  CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
	  CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
	  u2.uid as debitor_uid,
			u1.uid as creditor_uid,
	  c.amount,
	  c.number,
	  c.uid,
	  a.inc,
	  a.end_date,
	  c.currency,
	  c.created_at
FROM contracts c
LEFT JOIN
 (SELECT *
  FROM acts
  WHERE id IN
	  (SELECT MAX(id)
	   FROM acts a
	   WHERE a.status = 1
	   GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 1
 AND c.${req.query.type} = ${candidate.id} ${dss}
 AND a.status = 1
ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip}`
    );
    const count = await knex.raw(
      `SELECT c.id,
	  a.residual_amount,
	  CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
	  CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
	  u2.uid as debitor_uid,
			u1.uid as creditor_uid,
	  c.amount,
	  c.number,
	  a.inc,
	  a.end_date,
	  c.currency,
	  c.created_at
FROM contracts c
LEFT JOIN
 (SELECT *
  FROM acts
  WHERE id IN
	  (SELECT MAX(id)
	   FROM acts a
	   WHERE a.status = 1
	   GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 1
 AND c.${req.query.type} = ${candidate.id} ${dss}
 AND a.status = 1
ORDER BY c.id DESC`
    );
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {}
};
exports.debQarzExport = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    let dss;

    if (req.query.start != "0" && req.query.end != "0") {
      dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`;
    } else {
      dss = " ";
    }
    const data = await knex.raw(
      `SELECT c.id,
	  a.residual_amount,
	  CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
	  CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
	  u2.uid as debitor_uid,
			u1.uid as creditor_uid,
	  c.amount,
	  c.number,
	  a.inc,
	  c.uid,

	  a.end_date,
	  c.currency,
	  c.created_at
FROM contracts c
LEFT JOIN
 (SELECT *
  FROM acts
  WHERE id IN
	  (SELECT MAX(id)
	   FROM acts a
	   WHERE a.status = 1
	   GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 1
 AND c.${req.query.type} = ${candidate.id} ${dss}
 AND a.status = 1
ORDER BY c.id DESC;`
    );

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.searchDebQarz = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  console.log(req.query);
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    let data;
    let count;
    if (req.query.type == "debitor") {
      data = await knex.raw(
        `SELECT c.id,
			a.residual_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			u2.uid as debitor_uid,
			u1.uid as creditor_uid,
			c.amount,
			c.number,
			c.uid,

			a.inc,
			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	   (SELECT *
		FROM acts
		WHERE id IN
			(SELECT MAX(id)
			 FROM acts a
			 WHERE a.status = 1
			 GROUP BY contract_id) ) a ON a.contract_id = c.id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.debitor = ${candidate.id}
	   AND a.status = 1  AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};`
      );
      count = await knex.raw(
        `SELECT c.id,
			a.residual_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			u2.uid as debitor_uid,
			u1.uid as creditor_uid,
			c.amount,
			c.number,
			a.inc,
			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	   (SELECT *
		FROM acts
		WHERE id IN
			(SELECT MAX(id)
			 FROM acts a
			 WHERE a.status = 1
			 GROUP BY contract_id) ) a ON a.contract_id = c.id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.debitor = ${candidate.id}
	   AND a.status = 1  AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC;`
      );
    }
    if (req.query.type == "creditor") {
      data = await knex.raw(
        `SELECT c.id,
			a.residual_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			u2.uid as debitor_uid,
			u1.uid as creditor_uid,
			c.amount,
			c.number,
			a.inc,
			c.uid,

			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	   (SELECT *
		FROM acts
		WHERE id IN
			(SELECT MAX(id)
			 FROM acts a
			 WHERE a.status = 1
			 GROUP BY contract_id) ) a ON a.contract_id = c.id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.creditor = ${candidate.id}
	   AND a.status = 1  AND ( CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};`
      );
      count = await knex.raw(
        `SELECT c.id,
			a.residual_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			u2.uid as debitor_uid,
			u1.uid as creditor_uid,
			c.amount,
			c.number,
			a.inc,
			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	   (SELECT *
		FROM acts
		WHERE id IN
			(SELECT MAX(id)
			 FROM acts a
			 WHERE a.status = 1
			 GROUP BY contract_id) ) a ON a.contract_id = c.id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.creditor = ${candidate.id}
	   AND a.status = 1  AND ( CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC;`
      );
    }
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {
    console.log(error);
  }
};
exports.arrearage = async (req, res) => {
  try {
  } catch (error) {}
};
exports.hisobot = async (req, res) => {
  try {
  } catch (error) {}
};

exports.getById = async (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).json({ success: false });
  }
  try {
    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT  c.id,c.debitor,c.uid,c.creditor,a.inc,a.id as act,a.refundable_amount,a.end_date,u2.passport as debitor_passport, u1.passport as creditor_passport, u2.issued_by as debitor_issued,u1.issued_by as creditor_issued, u2.issued_date as debitor_issued_date,u1.issued_date as creditor_issued_date,  CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name, '') AS debitor_name, CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name, '') AS creditor_name, c.amount,c.number, c.currency,c.created_at , a.residual_amount as residual_amount
		FROM contracts c
		LEFT JOIN (
		  SELECT * 
			FROM acts 
			WHERE id IN (
				  SELECT MAX(id)
			FROM acts a
			WHERE a.status = 1
			GROUP BY contract_id)
		) a ON a.contract_id = c.id
		LEFT JOIN users u1 ON u1.id = c.creditor 
		LEFT JOIN users u2 ON u2.id = c.debitor 
		WHERE c.status = 1 AND c.id = ${req.params.id}
		`);
    return res.status(200).json({ success: true, data: data[0][0] });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
exports.expiredExport = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    let dss;

    if (req.query.start != "0" && req.query.end != "0") {
      dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`;
    } else {
      dss = " ";
    }
    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
       CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
	   u2.uid as debitor_uid,
			u1.uid as creditor_uid,
       c.amount,
       c.number,
       a.inc,
	  c.uid,

       a.end_date,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
  (SELECT *
   FROM acts
   WHERE id IN
       (SELECT MAX(id)
        FROM acts a
		WHERE a.status = 1
        GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 1
  AND c.${req.query.type} = ${candidate.id} ${dss}
  AND a.status = 1
  AND a.end_date < CURRENT_DATE()
ORDER BY c.id DESC
;`);

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.expired = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    let dss;

    if (req.query.start != "0" && req.query.end != "0") {
      dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`;
    } else {
      dss = " ";
    }
    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
       CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
	   u2.uid as debitor_uid,
			u1.uid as creditor_uid,
       c.amount,
       c.number,
	   c.uid,
       a.inc,
       a.end_date,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
  (SELECT *
   FROM acts
   WHERE id IN
       (SELECT MAX(id)
        FROM acts a
		WHERE a.status = 1
        GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 1
  AND c.${req.query.type} = ${candidate.id} ${dss}
  AND a.status = 1
  AND a.end_date < CURRENT_DATE()
ORDER BY c.id DESC
LIMIT ${limit}
OFFSET ${skip};`);
    const count = await knex.raw(`
		SELECT c.id, a.residual_amount,u2.uid as debitor_uid,
		u1.uid as creditor_uid, CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name, CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name, c.amount,c.number, a.inc,a.end_date,c.currency,c.created_at FROM contracts c LEFT JOIN (SELECT * FROM acts a  WHERE id IN (SELECT MAX(id) FROM acts WHERE a.status = 1 GROUP BY contract_id) ) a ON a.contract_id = c.id LEFT JOIN users u1 ON u1.id = c.creditor LEFT JOIN users u2 ON u2.id = c.debitor WHERE c.status = 1 AND c.${req.query.type} = ${candidate.id} ${dss} AND a.status = 1 AND a.end_date < CURRENT_DATE() ORDER BY c.id DESC;
		`);
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {
    console.log(error);
  }
};
exports.expiredSearch = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

    const knex = await Contract.knex();
    let data;
    let count;
    if (req.query.type == "debitor") {
      data = await knex.raw(`
		SELECT c.id,
		a.residual_amount,
		CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		u2.uid as debitor_uid,
			u1.uid as creditor_uid,
		c.amount,
		c.number,
		c.uid,
		a.inc,
		a.end_date,
		c.currency,
		c.created_at
  FROM contracts c
  LEFT JOIN
   (SELECT *
	FROM acts
	WHERE id IN
		(SELECT MAX(id)
		 FROM acts
		 GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status = 1
   AND c.${req.query.type} = ${candidate.id}
   AND a.status = 1
   AND a.end_date < CURRENT_DATE() AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};
			`);
      count = await knex.raw(`
		SELECT c.id,
		a.residual_amount,
		CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		u2.uid as debitor_uid,
			u1.uid as creditor_uid,
		c.amount,
		c.number,
		a.inc,
		a.end_date,
		c.currency,
		c.created_at
  FROM contracts c
  LEFT JOIN
   (SELECT *
	FROM acts
	WHERE id IN
		(SELECT MAX(id)
		 FROM acts
		 GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status = 1
   AND c.${req.query.type} = ${candidate.id}
   AND a.status = 1
   AND a.end_date < CURRENT_DATE() AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC;
			`);
    }
    if (req.query.type == "creditor") {
      data = await knex.raw(`
		SELECT c.id,
		a.residual_amount,
		CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		u2.uid as debitor_uid,
			u1.uid as creditor_uid,
		c.amount,
		c.number,
		a.inc,
		a.end_date,
		c.currency,
		c.created_at
  FROM contracts c
  LEFT JOIN
   (SELECT *
	FROM acts
	WHERE id IN
		(SELECT MAX(id)
		 FROM acts
		 GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status = 1
   AND c.${req.query.type} = ${candidate.id}
   AND a.status = 1
   AND a.end_date < now() AND ( CONCAT(u2.last_name, ' ', u2.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};
			`);
      count = await knex.raw(`
		SELECT c.id,
		a.residual_amount,
		CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		u2.uid as debitor_uid,
			u1.uid as creditor_uid,
		c.amount,
		c.number,
		a.inc,
		a.end_date,
		c.currency,
		c.created_at
  FROM contracts c
  LEFT JOIN
   (SELECT *
	FROM acts
	WHERE id IN
		(SELECT MAX(id)
		 FROM acts
		 GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status = 1
   AND c.${req.query.type} = ${candidate.id}
   AND a.status = 1
   AND a.end_date < now() AND ( CONCAT(u2.last_name, ' ', u2.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC;
			`);
    }
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {
    console.log(error);
  }
};
exports.getUsd = async (req, res) => {
  await axois
    .get("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
    .then((resss) => {
      ussd = resss.data[0].Rate;
      return res.status(200).json({ success: true, data: ussd });
    })
    .catch((err) => {
      console.log(err);
    });
};
//
exports.near = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  const curren = req.query.currency;
  const interval = req.query.day;
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();

    // 		const data = await knex.raw(`
    // 		SELECT c.id,
    //        a.residual_amount,
    //        a.refundable_amount,
    //        c.uid,
    //        u2.uid AS debitor_uid,
    //        u1.uid AS creditor_uid,
    //        CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
    //        CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
    //        c.amount,
    //        c.number,
    //        a.inc,
    //        a.end_date,
    //        c.currency,
    //        c.created_at
    // FROM contracts c
    // LEFT JOIN
    //   (SELECT *
    //    FROM acts
    //    WHERE id IN
    //        (SELECT MAX(id)
    //         FROM acts
    //         GROUP BY contract_id) ) a ON a.contract_id = c.id
    // LEFT JOIN users u1 ON u1.id = c.creditor
    // LEFT JOIN users u2 ON u2.id = c.debitor
    // WHERE c.status = 1
    //   AND c.${req.query.type} = ${candidate.id}
    //   AND a.status = 1
    //   AND a.end_date = '${interval}'
    // ORDER BY c.id DESC
    // LIMIT ${limit}
    // OFFSET ${skip};
    // 		`);

    const data = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       a.refundable_amount,
       c.uid,
       u2.uid AS debitor_uid,
       u1.uid AS creditor_uid,
       CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
       CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
       c.amount,
       c.number,
       a.inc,
       a.end_date,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
(SELECT *
	FROM acts
	WHERE id IN
	   (SELECT MAX(id)
	  FROM acts
		GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 1
  AND c.${req.query.type} = ${candidate.id}
  AND a.status = 1
  AND a.end_date = '${interval}'
  AND c.currency = '${curren}'
ORDER BY c.id DESC
LIMIT ${limit}
OFFSET ${skip};
		`);

    const count = await knex.raw(`
		SELECT c.id, a.residual_amount,a.refundable_amount,u2.uid as debitor_uid,
		u1.uid as creditor_uid, CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name, CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name, c.amount,c.number, a.inc,a.end_date,c.currency,c.created_at FROM contracts c LEFT JOIN (SELECT *
			FROM acts
			WHERE id IN
			   (SELECT MAX(id)
			  FROM acts
				GROUP BY contract_id) ) a ON a.contract_id = c.id LEFT JOIN users u1 ON u1.id = c.creditor LEFT JOIN users u2 ON u2.id = c.debitor WHERE c.status = 1 AND c.${req.query.type} = ${candidate.id} AND a.status = 1 AND a.end_date='${interval}' ORDER BY c.id DESC;
		`);
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {
    console.log(error);
  }
};
exports.nearExport = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    const interval = req.query.day || 5;
    const data = await knex.raw(`
		SELECT c.id, a.residual_amount,a.refundable_amount,u2.uid as debitor_uid,c.uid,
		u1.uid as creditor_uid, CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name, CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name, c.amount,c.number, a.inc,a.end_date,c.currency,c.created_at FROM contracts c LEFT JOIN (SELECT *
			FROM acts
			WHERE id IN
			   (SELECT MAX(id)
			  FROM acts
				GROUP BY contract_id) ) a ON a.contract_id = c.id LEFT JOIN users u1 ON u1.id = c.creditor LEFT JOIN users u2 ON u2.id = c.debitor WHERE c.status = 1 AND c.${req.query.type} = ${candidate.id} AND a.status = 1 AND a.end_date = '${interval}' ORDER BY c.id DESC;
		`);

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.nearSearch = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  const interval = req.query.day || 5;
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    let data;
    let count;
    if (req.query.type == "debitor") {
      data = await knex.raw(`
			SELECT c.id,
			a.residual_amount,
			a.refundable_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			c.amount,
			c.number,
			u2.uid as debitor_uid,
			u1.uid as creditor_uid,
			a.inc,
			c.uid,
			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	  (SELECT *
      FROM acts
      WHERE id IN
         (SELECT MAX(id)
        FROM acts
          GROUP BY contract_id) ) a ON a.contract_id = c.id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.${req.query.type} = ${candidate.id}
	   AND a.status = 1
	   AND  a.end_date = '${interval}'  AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};	  
			`);
      count = await knex.raw(`
			SELECT c.id,
			a.residual_amount,
			a.refundable_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			u2.uid as debitor_uid,
			u1.uid as creditor_uid,
			c.amount,
			c.number,
			a.inc,
			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	  (SELECT *
		FROM acts
		WHERE id IN
		   (SELECT MAX(id)
		  FROM acts
			GROUP BY contract_id) ) a ON a.contract_id = c.id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.${req.query.type} = ${candidate.id}
	   AND a.status = 1
	   AND  a.end_date = '${interval}'  AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC;	  
			`);
    }
    if (req.query.type == "creditor") {
      data = await knex.raw(`
			SELECT c.id,
			a.residual_amount,
			a.refundable_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			c.amount,
			c.number,
			a.inc,
			a.end_date,
			c.uid,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	  acts a on c.id = a.contract_id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.${req.query.type} = ${candidate.id}
	   AND a.status = 1
	   AND  a.end_date = '${interval}'  DAY AND ( CONCAT(u2.last_name, ' ', u2.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};	  
			`);
      count = await knex.raw(`
			SELECT c.id,
			a.residual_amount,
			a.refundable_amount,
			CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
			CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
			c.amount,
			c.number,
			a.inc,
			a.end_date,
			c.currency,
			c.created_at
	  FROM contracts c
	  LEFT JOIN
	  acts a on c.id = a.contract_id
	  LEFT JOIN users u1 ON u1.id = c.creditor
	  LEFT JOIN users u2 ON u2.id = c.debitor
	  WHERE c.status = 1
	   AND c.${req.query.type} = ${candidate.id}
	   AND a.status = 1
	   AND  a.end_date = '${interval}'  AND ( CONCAT(u2.last_name, ' ', u2.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
	  ORDER BY c.id DESC;	  
			`);
    }
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {
    console.log(error);
  }
};
exports.debUzay = async (req, res) => {
  try {
    const not = await Act.query()
      .findOne("contract_id", req.body.contract)
      .andWhere("status", 0)
      .orderBy("id", "DESC");
    if (not) {
      return res.status(200).json({ success: false, msg: "ex" });
    }
    Act.query()
      .insert({
        contract_id: req.body.contract,
        end_date: req.body.end_date,
        refundable_amount: req.body.refundable_amount,
        old_amount: req.body.old_amount,
        residual_amount: req.body.residual_amount,
        vos_summa: req.body.vos_summa,
        inc: req.body.inc,
        create_time: new Date(),
        sender: req.body.sender,
        reciver: req.body.res,
        status: 1,
        type: 6,
      })
      .then(async (response) => {
        await Notification.query().insert({
          reciver: req.body.reciver,
          debitor: req.body.debitor,
          creditor: req.body.creditor,
          type: 16,
          contract: req.body.contract,
          status: 0,
          time: new Date(),
          act: response.id,
        });
        const userss = await User.query().findOne("id", req.body.reciver);

        FM.send(option(userss, 2), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
        return res.status(201).json({ success: true });
      })
      .catch((error) => {
        return console.log(error);
      });
  } catch (error) {
    return console.log(error);
  }
};
exports.restitution = async (req, res) => {
  try {
    console.log(req.body);
    const not = await Act.query()
      .findOne("contract_id", req.body.contract)
      .andWhere("status", 0);
    const ss = await Notification.query().where("contract", req.body.contract);
    if (not) {
      return res.status(200).json({ success: false, msg: "ex" });
    }
    Act.query()
      .insert({
        contract_id: req.body.contract,
        end_date: req.body.end_date,
        old_amount: req.body.old_amount,
        refundable_amount: req.body.refundable_amount,
        residual_amount: req.body.residual_amount,
        vos_summa: req.body.vos_summa,
        sender: req.body.sender,
        create_time: new Date(),
        reciver: req.body.res,
        inc: req.body.inc,
        status: req.body.status,
        type: req.body.type,
      })
      .then(async (response) => {
        await Notification.query().insert({
          reciver: req.body.reciver,
          debitor: req.body.debitor,
          creditor: req.body.creditor,
          type: req.body.ntype,
          contract: req.body.contract,
          status: req.body.status,
          time: new Date(),
          act: response.id,
        });
        const userss = await User.query().findOne("id", req.body.reciver);

        FM.send(option(userss, 3), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
        return res.status(201).json({ success: true });
      })
      .catch((error) => {
        return console.log(error);
      });
  } catch (error) {
    return console.log(error);
  }
};
exports.talabQilish = async (req, res) => {
  try {
    await Notification.query().insert({
      contract: req.body.contract,
      debitor: req.body.debitor,
      act: req.body.act,
      creditor: req.body.creditor,
      reciver: req.body.reciver,
      time: new Date(),
      status: 0,
      type: 17,
    });
    const user = await User.query().findOne("id", req.body.reciver);
    if (user) {
      FM.send(option(user, 5), (error, response) => {
        if (error) {
          console.log(error);
        }
        console.log(response, "response");
      });
    }
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
exports.reports = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    let strss;
    let dss;
    let ser;
    switch (req.query.status) {
      case "all":
        strss = `c.status != 1`;
        break;
      case "1":
        strss = `c.status = 2`;
        break;
      case "2":
        strss = `(c.status = 3 OR c.status = 4)`;
        break;
      default:
        strss = `c.status != 1`;
        break;
    }
    if (req.query.start != "0" && req.query.end != "0") {
      dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`;
    } else {
      dss = " ";
    }

    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       a.refundable_amount,
       a.vos_summa,
	   c.status,
       CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
       CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
       c.amount,
	   c.uid,
	   u2.uid as debitor_uid,
	   u1.uid as creditor_uid,
       c.number,
       a.inc,
       a.end_date,
	   c.end_date as sana,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
  (SELECT *
   FROM acts
   WHERE id IN
       (SELECT MAX(id)
        FROM acts
        GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE ${strss} AND c.status != 0 ${dss}
  AND c.${req.query.type} = ${candidate.id}
ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};
	`);
    const count = await knex.raw(`
	SELECT c.id,
   a.residual_amount,
   a.refundable_amount,
   a.vos_summa,
   c.status,
   CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
   CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
   c.amount,
   c.number,
   a.inc,
   a.end_date,
   c.currency,
   c.created_at
FROM contracts c
LEFT JOIN
(SELECT *
FROM acts
WHERE id IN
   (SELECT MAX(id)
	FROM acts
	GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE ${strss} AND c.status != 0 ${dss}
AND c.${req.query.type} = ${candidate.id}
ORDER BY c.id DESC;
`);
    const act = await knex.raw(`
	SELECT c.id,
   a.residual_amount,
   a.refundable_amount,
   a.vos_summa,
   c.status,
   CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
   CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
   c.amount,
   c.number,
   a.inc,
   a.end_date,
   c.currency,
   c.created_at
FROM contracts c
LEFT JOIN
(SELECT *
FROM acts
WHERE id IN
   (SELECT MAX(id)
	FROM acts
	GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status = 2 AND c.status != 0
AND c.${req.query.type} = ${candidate.id}
ORDER BY c.id DESC;
`);
    const pass = await knex.raw(`
	SELECT c.id,
   a.residual_amount,
   a.refundable_amount,
   a.vos_summa,
   c.status,
   CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
   CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
   c.amount,
   c.number,
   a.inc,
   a.end_date,
   c.currency,
   c.created_at
FROM contracts c
LEFT JOIN
(SELECT *
FROM acts
WHERE id IN
   (SELECT MAX(id)
	FROM acts
	GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE (c.status = 3 or c.status = 4) AND c.status != 0
AND c.${req.query.type} = ${candidate.id}
ORDER BY c.id DESC;
`);
    return res.status(200).json({
      success: true,
      data: data[0],
      count: count[0].length,
      act: act[0].length,
      pass: pass[0].length,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.reportsExport = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       a.refundable_amount,
       a.vos_summa,
	   c.status,
       CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
       CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
       c.amount,
	   u2.uid as debitor_uid,
	   u1.uid as creditor_uid,
       c.number,
       a.inc,
       a.end_date,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
  (SELECT *
   FROM acts
   WHERE id IN
       (SELECT MAX(id)
        FROM acts
        GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status != 1 AND c.status != 0
  AND c.${req.query.type} = ${candidate.id}
ORDER BY c.end_date DESC;
	`);

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.reportOne = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT c.id,
       a.residual_amount,
       a.refundable_amount,
       a.vos_summa,
	   c.status,
       CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
       CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
       c.amount,
       c.number,
       a.inc,
       a.end_date,
       c.currency,
       c.created_at
FROM contracts c
LEFT JOIN
  (SELECT *
   FROM acts
   WHERE id IN
       (SELECT MAX(id)
        FROM acts
        GROUP BY contract_id) ) a ON a.contract_id = c.id
LEFT JOIN users u1 ON u1.id = c.creditor
LEFT JOIN users u2 ON u2.id = c.debitor
WHERE c.status != 1 AND c.status != 0
  AND c.${req.query.type} = ${candidate.id} AND c.id = ${req.params.id}
ORDER BY c.id DESC ;
	`);

    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.reportsSearch = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

    const knex = await Contract.knex();
    let data;
    let count;
    if (req.query.type == "debitor") {
      data = await knex.raw(`

		SELECT c.id,
		 a.residual_amount,
		 c.status,
		 CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		 CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		 c.amount,
		 c.number,
		 a.inc,
		 a.vos_summa,
		 a.end_date,
		 c.currency,
		 c.created_at
  FROM contracts c
  LEFT JOIN
	(SELECT *
	 FROM acts
	 WHERE id IN
		 (SELECT MAX(id)
		  FROM acts
		  GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status != 1 AND c.status != 0
	AND c.${req.query.type} = ${candidate.id} AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};
		
		`);
      count = await knex.raw(`

		SELECT c.id,
		 a.residual_amount,
		 CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		 CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		 c.amount,
		 c.status,
		 c.number,
		 a.inc,
		 a.vos_summa,
		 a.end_date,
		 c.currency,
		 c.created_at
  FROM contracts c
  LEFT JOIN
	(SELECT *
	 FROM acts
	 WHERE id IN
		 (SELECT MAX(id)
		  FROM acts
		  GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status != 1 AND c.status != 0
	AND c.${req.query.type} = ${candidate.id} AND ( CONCAT(u1.last_name, ' ', u1.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC;
		
		`);
    }
    if (req.query.type == "creditor") {
      data = await knex.raw(`

		SELECT c.id,
		 a.residual_amount,
		 CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		 CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		 c.amount,
		 c.status,
		 c.number,
		 a.inc,
		 a.end_date,
		 c.currency,
		 c.created_at
  FROM contracts c
  LEFT JOIN
	(SELECT *
	 FROM acts
	 WHERE id IN
		 (SELECT MAX(id)
		  FROM acts
		  GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status != 1 AND c.status != 0
	AND c.${req.query.type} = ${candidate.id} AND ( CONCAT(u2.last_name, ' ', u2.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC LIMIT ${limit} OFFSET ${skip};
		
		`);
      count = await knex.raw(`

		SELECT c.id,
		 a.residual_amount,
		 CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name,
		 CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name,
		 c.amount,
		 c.status,
		 c.number,
		 a.inc,
		 a.end_date,
		 c.currency,
		 c.created_at
  FROM contracts c
  LEFT JOIN
	(SELECT *
	 FROM acts
	 WHERE id IN
		 (SELECT MAX(id)
		  FROM acts
		  GROUP BY contract_id) ) a ON a.contract_id = c.id
  LEFT JOIN users u1 ON u1.id = c.creditor
  LEFT JOIN users u2 ON u2.id = c.debitor
  WHERE c.status != 1 AND c.status != 0
	AND c.${req.query.type} = ${candidate.id} AND ( CONCAT(u2.last_name, ' ', u2.first_name, '') like '%${req.query.search}%' or c.number like '%${req.query.search}%' or c.amount like '%${req.query.search}%' or c.currency like '%${req.query.search}%')
  ORDER BY c.id DESC;
		
		`);
    }
    return res
      .status(200)
      .json({ success: true, data: data[0], count: count[0].length });
  } catch (error) {
    console.log(error);
  }
};
exports.getActs = async (req, res) => {
  try {
  } catch (error) {}
};
exports.forAdminContract = async (req, res) => {
  try {
  } catch (error) {}
};
exports.forAdminOneContract = async (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).json({ success: false });
  }
  try {
    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT c.id,
		c.debitor,
		CONCAT(u2.last_name, ' ', u2.first_name, ' ', u2.middle_name, '') AS debitor_name,
		CONCAT(u1.last_name, ' ', u1.first_name, ' ', u1.middle_name, '') AS creditor_name,
		c.amount,
		c.number,
		c.uid,
		c.currency,
		c.created_at
 FROM contracts c
 LEFT JOIN users u1 ON u1.id = c.creditor
 LEFT JOIN users u2 ON u2.id = c.debitor
 WHERE c.id = ${req.params.id}
		`);
    // const acts = await Act.query().where('contract_id', req.params.id)
    const act = await Act.knex();
    const acts = await act.raw(`
		SELECT a.id,
		a.contract_id,
		a.end_date,
		a.refundable_amount,
		a.residual_amount,
		a.vos_summa,
		a.inc,
		a.status,
		a.type,
		a.reciver,
		a.created_at,
		a.updated_at,
		concat(res.last_name, ' ', res.first_name, ' ', res.middle_name, '') AS res_name
 FROM acts a
 LEFT JOIN users res ON res.id = a.reciver
 WHERE a.contract_id = ${req.params.id};
		`);
    return res
      .status(200)
      .json({ success: true, contract: data[0][0], acts: acts[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.toliqVosKechish = async (req, res) => {
  try {
    const not = await Act.query()
      .findOne("contract_id", req.body.contract)
      .andWhere("status", 0)
      .orderBy("id", "DESC");
    const ss = await Notification.query().where("contract", req.body.contract);
    // 		if(ss != null){
    // 			return res.status(200).json({success: false,message:'not-est'})
    // 		}
    if (not) {
      return res.status(200).json({ success: false, msg: "ex" });
    }
    Act.query()
      .insert({
        type: 4,
        status: 1,
        contract_id: req.body.contract,
        refundable_amount: req.body.refundable_amount,
        old_amount: req.body.old_amount,
        residual_amount: 0,
        vos_summa: req.body.vos_summa,
        sender: req.body.sender,
        reciver: req.body.res,
        create_time: new Date(),
        approved_time: new Date(),
        inc: req.body.inc,
      })
      .then(async (response) => {
        await Contract.query()
          .findById(req.body.contract)
          .update({ status: 2, end_date: new Date() })
          .catch((error) => {
            return console.log(error);
          });
        await Notification.query()
          .delete()
          .where("contract", req.body.contract);
        await Notification.query()
          .insert({
            reciver: req.body.reciver,
            debitor: req.body.debitor,
            creditor: req.body.creditor,
            time: new Date(),
            type: 4,
            contract: req.body.contract,
            act: response.id,
          })
          .catch((error) => {
            return console.log(error);
          });

        const user = await User.query().findById(req.body.reciver);
        if (user) {
          FM.send(option(user, 6), (error, response) => {
            if (error) {
              console.log(error);
            }
            console.log(response);
          });
        }

        return res.status(201).json({ success: true });
      });
  } catch (error) {
    return console.log(error);
  }
};
exports.lastAct = async (req, res) => {
  try {
  } catch (error) {}
};
exports.oldiBardi = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT 
		u.id,  u.last_name, u.gender,  u.first_name, u.middle_name,u.uid,u.rating,u.created_at,u.type,u.company
	FROM contracts c
	LEFT JOIN users u ON (u.id = c.debitor OR u.id = c.creditor) AND u.id != ${candidate.id}
	WHERE c.debitor = ${candidate.id} OR c.creditor = ${candidate.id}
	GROUP BY u.id;	`);
    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
exports.oldiBardiSearch = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const knex = await Contract.knex();
    const data = await knex.raw(`
		SELECT 
		u.id,  u.last_name, u.first_name, u.middle_name,u.created_at,u.type,u.company
	FROM contracts c
	LEFT JOIN users u ON (u.id = c.debitor OR u.id = c.creditor) AND u.id != ${candidate.id}
	WHERE (c.debitor = ${candidate.id} OR c.creditor = ${candidate.id}) 
	AND CONCAT(u.last_name, ' ', u.first_name, ' ', u.middle_name, '') like '%${req.query.search}%'
	GROUP BY u.id;	`);
    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log(error);
  }
};
//
