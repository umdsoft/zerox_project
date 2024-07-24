const Users = require('../models/Users');
const Contracts = require('../models/Contracts');
const Report = require('../models/Transfer');
const User = require('../models/Users');

exports.getStatistic = async (req, res) => {
    const knex = await Users.knex();
    const byGender = await knex.raw(`SELECT u.gender as gender, COUNT(u.gender) as cnt FROM users u WHERE u.is_active = 1 AND u.type = 2 GROUP BY u.gender;`)
    const byRegion = await knex.raw(`SELECT u.region as region, COUNT(u.id) as cnt FROM users u WHERE u.is_active = 1 AND u.type = 2 GROUP BY u.region;`)
    const byAge = await knex.raw(`SELECT CASE
    WHEN age < 18 THEN 'Under 18'
    WHEN age BETWEEN 18 AND 25 THEN '18 - 25'
    WHEN age BETWEEN 26 AND 30 THEN '26 - 30'
    WHEN age BETWEEN 31 AND 40 THEN '31 - 40'
    WHEN age BETWEEN 51 AND 50 THEN '41 - 50'
    WHEN age BETWEEN 51 AND 60 THEN '51 - 60'
    WHEN age >= 60 THEN 'Over 60'
    WHEN age IS NULL THEN 'Not Filled In (NULL)'
END AS age_range,
COUNT(*) AS count
FROM
(SELECT TIMESTAMPDIFF(YEAR, STR_TO_DATE(u.brithday, '%d.%m.%Y'), CURDATE()) AS age
FROM users u
WHERE u.is_active = 1
AND u.type = 2) AS derived
GROUP BY age_range
ORDER BY age_range;`)
    return res.status(200).json({
        success: true, byGender: byGender[0], byRegion: byRegion[0], byAge: byAge[0]
    })
}
exports.getAllContracts = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    let ids, cfio, dfio, date
    if (req.query.id) {
        ids = `AND c.number LIKE ('%${req.query.id}%')`
    } else {
        ids = ' '
    }
    if (req.query.dfio) {
        dfio = `AND CONCAT(debitor.last_name, ' ', debitor.first_name, ' ', debitor.middle_name, '') LIKE ('%${req.query.dfio}%')`
    } else {
        dfio = ' '
    }

    if (req.query.cfio) {
        cfio = `AND CONCAT(creditor.last_name, ' ', creditor.first_name, ' ', creditor.middle_name, '') LIKE ('%${req.query.cfio}%')`
    } else {
        cfio = ' '
    }

    const knex = await Contracts.knex()
    const contracts = await knex.raw(`SELECT c.id,
    c.number,
    c.status,
    CONCAT(debitor.last_name, ' ', debitor.first_name, ' ', debitor.middle_name, '') AS debitor_name,
    CONCAT(creditor.last_name, ' ', creditor.first_name, ' ', creditor.middle_name, '') AS creditor_name,
    debitor.uid AS debitor_id,
    creditor.uid AS creditor_id,
    debitor.company as dcompany,
    creditor.company as ccompany,
    debitor.type as dtype,
    creditor.type as ctype,
    c.amount,
    c.currency,
    c.end_date
FROM contracts c
LEFT JOIN users debitor ON debitor.id = c.debitor
LEFT JOIN users creditor ON creditor.id = c.creditor
WHERE c.status != 10 ${ids} ${cfio} ${dfio}
ORDER BY c.id DESC
LIMIT ${limit}
OFFSET ${skip};`
    )
    const count = await knex.raw(`SELECT c.id,
    c.number,
    c.status,
    CONCAT(debitor.last_name, ' ', debitor.first_name, ' ', debitor.middle_name, '') AS debitor_name,
    CONCAT(creditor.last_name, ' ', creditor.first_name, ' ', creditor.middle_name, '') AS creditor_name,
    debitor.uid AS debitor_id,
    creditor.uid AS creditor_id,
    debitor.company as dcompany,
    creditor.company as ccompany,
    debitor.type as dtype,
    creditor.type as ctype,
    c.amount,
    c.currency,
    c.end_date
FROM contracts c
LEFT JOIN users debitor ON debitor.id = c.debitor
LEFT JOIN users creditor ON creditor.id = c.creditor
WHERE c.status != 10 ${ids} ${cfio} ${dfio}
ORDER BY c.id DESC;`
    )
    return res.status(200).json({ success: true, data: contracts[0], count: count[0].length, all: count[0] })
}
exports.getDebitorContract = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    const knex = await Contracts.knex()
    const contracts = await knex.raw(`SELECT c.id,
    c.status,
    c.number,
    debitor.uid AS debitor_uid,
    creditor.uid AS creditor_uid,
    CONCAT(debitor.last_name, ' ', debitor.first_name, ' ', debitor.middle_name, '') AS debitor_name,
    CONCAT(creditor.last_name, ' ', creditor.first_name, ' ', creditor.middle_name, '') AS creditor_name,
    debitor.uid AS debitor_id,
    creditor.uid AS creditor_id,
    c.amount,
    c.currency,
    c.end_date
FROM contracts c
LEFT JOIN users debitor ON debitor.id = c.debitor
LEFT JOIN users creditor ON creditor.id = c.creditor
WHERE c.status != 0
AND c.debitor = ${req.params.id}
ORDER BY c.id DESC
`)
    const count = await knex.raw(`SELECT c.id,c.status,c.number,debitor.uid as debitor_uid, creditor.uid as creditor_uid, CONCAT(debitor.last_name, ' ', debitor.first_name, ' ',debitor.middle_name, '') AS debitor_name,CONCAT(creditor.last_name, ' ', creditor.first_name, ' ',creditor.middle_name, '') AS creditor_name,debitor.uid as debitor_id, creditor.uid as creditor_id,c.amount,c.currency,c.end_date 
    FROM contracts c 
    LEFT JOIN users debitor ON debitor.id = c.debitor
    LEFT JOIN users creditor ON creditor.id = c.creditor
    WHERE c.status != 0 AND c.debitor = ${req.params.id} ORDER by c.id desc;`)

    return res.status(200).json({ success: true, data: contracts[0], count: count[0].length })
}
exports.getCreditorContract = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    const knex = await Contracts.knex()
    const contracts = await knex.raw(`SELECT c.id,c.number,c.status,debitor.uid as debitor_uid, creditor.uid as creditor_uid,  CONCAT(debitor.last_name, ' ', debitor.first_name, ' ',debitor.middle_name, '') AS debitor_name,CONCAT(creditor.last_name, ' ', creditor.first_name, ' ',creditor.middle_name, '') AS creditor_name,debitor.uid as debitor_id, creditor.uid as creditor_id,c.amount,c.currency,c.end_date 
    FROM contracts c 
    LEFT JOIN users debitor ON debitor.id = c.debitor
    LEFT JOIN users creditor ON creditor.id = c.creditor
    WHERE c.status != 0 AND c.creditor = ${req.params.id} ORDER by c.id desc LIMIT ${limit} OFFSET ${skip};`)

    const count = await knex.raw(`SELECT c.id,c.number,c.status,debitor.uid as debitor_uid, creditor.uid as creditor_uid,  CONCAT(debitor.last_name, ' ', debitor.first_name, ' ',debitor.middle_name, '') AS debitor_name,CONCAT(creditor.last_name, ' ', creditor.first_name, ' ',creditor.middle_name, '') AS creditor_name,debitor.uid as debitor_id, creditor.uid as creditor_id,c.amount,c.currency,c.end_date 
    FROM contracts c 
    LEFT JOIN users debitor ON debitor.id = c.debitor
    LEFT JOIN users creditor ON creditor.id = c.creditor
    WHERE c.status != 0 AND c.creditor = ${req.params.id} ORDER by c.id desc;`)
    return res.status(200).json({ success: true, data: contracts[0], count: count[0].length })
}
exports.getUsers = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    let ids, fio, birthdate, phone, passport

    if (req.query.id) {
        ids = `AND u.uid LIKE ('%${req.query.id}%')`
    } else {
        ids = ' '
    }
    if (req.query.fio) {
        fio = `AND CONCAT(u.last_name, ' ', u.first_name, ' ', u.middle_name, '') LIKE ('%${req.query.fio}%')`
        console.log(fio)
    } else {
        fio = ' '
    }
    if (req.query.birthdate) {
        const dday = `${req.query.birthdate.slice(8, 10)}.${req.query.birthdate.slice(5, 7)}.${req.query.birthdate.slice(0, 4)}`
        birthdate = `AND u.brithday LIKE ('%${dday}%')`
    } else {
        birthdate = ' '
    }
    if (req.query.phone) {
        phone = `AND u.phone LIKE ('%${req.query.phone}%')`
    } else {
        phone = ' '
    }
    if (req.query.passport) {
        passport = `AND u.passport LIKE CONCAT('%${req.query.passport}%')`
    } else {
        passport = ' '
    }
    const knex = await Users.knex();
    const users = await knex.raw(`
        SELECT u.id,
        u.contract_date,
        u.is_active,
        u.uid,
        CONCAT(u.last_name, ' ', u.first_name, ' ', u.middle_name, '') AS full_name,
        u.brithday,
        u.created_at,
	u.con_time,
        u.phone,
        u.passport,
        CONCAT(u.region, ' ', u.district, ' ', u.address) AS address,
        u.stir,
        u.pinfl,
        u.company,
        u.director,
        u.address AS legal_address
        FROM users u
        WHERE u.type = ${req.params.id} ${ids} ${fio} ${birthdate} ${phone} ${passport}     
        ORDER BY u.id DESC
        LIMIT ${limit}
        OFFSET ${skip};
    `)

    const count = await knex.raw(`
    SELECT u.id,
    u.contract_date,
    u.is_active,
    u.uid,
    CONCAT(u.last_name, ' ', u.first_name, ' ', u.middle_name, '') AS full_name,
    u.brithday,
    u.created_at,
    u.con_time,
    u.phone,
    u.passport,
    CONCAT(u.region, ' ', u.district, ' ', u.address) AS address,
    u.stir,
    u.pinfl,
    u.company,
    u.director,
    u.address AS legal_address
FROM users u
WHERE u.type = ${req.params.id} ${ids} ${fio} ${birthdate} ${phone} ${passport}     

ORDER BY u.id DESC
    `)
    //  OR CONCAT(u.region, ' ', u.district, ' ', u.address) LIKE CONCAT('%', ${searchTerm}, '%')
    //  OR u.stir LIKE CONCAT('%', ${searchTerm}, '%')
    //  OR u.pinfl LIKE CONCAT('%', ${searchTerm}, '%')
    //  OR u.company LIKE CONCAT('%', ${searchTerm}, '%')
    //  OR u.director LIKE CONCAT('%', ${searchTerm}, '%')
    //  OR u.address LIKE CONCAT('%', ${searchTerm}, '%')
    return res.status(200).json({ success: true, data: users[0], count: count[0].length, all: count[0] })
}

exports.getUserContractHisory = async (req, res) => {

}

exports.getTransferSum = async (req, res) => {
    const limit = req.query.limit || 15;
    const skip = (req.query.page - 1) * limit;
    const all = await Report.knex()
    const dd = await all.raw(`
    SELECT r.id,
    CONCAT(us.last_name, ' ', us.first_name, ' ', us.middle_name, '') AS sname,
    CONCAT(ur.last_name, ' ', ur.first_name, ' ', ur.middle_name, '') AS rname,
    us.uid as sid,
    ur.uid as rid,
    r.created_at, r.time,r.amount, r.dublicate
FROM report AS r
LEFT JOIN users us ON us.id = r.user_id
LEFT JOIN users ur ON ur.id = r.reciver
WHERE (r.type = 2
OR r.type = 3 ) and r.dublicate=1
ORDER BY r.id DESC 
LIMIT ${limit} OFFSET ${skip};`)
    const count = await all.raw(`
SELECT r.id,
    CONCAT(us.last_name, ' ', us.first_name, ' ', us.middle_name, '') AS sname,
    CONCAT(ur.last_name, ' ', ur.first_name, ' ', ur.middle_name, '') AS rname,
    us.uid as sid,
    ur.uid as rid,
    r.created_at, r.time,r.amount
FROM report AS r
LEFT JOIN users us ON us.id = r.user_id
LEFT JOIN users ur ON ur.id = r.reciver
WHERE (r.type = 2
OR r.type = 3 ) and r.dublicate=1
ORDER BY r.id DESC`)
    return res.status(200).json({ success: true, data: dd[0], count: count[0].length, exp: count[0] })
}
exports.getTransferMob = async (req, res) => {
    const limit = req.query.limit || 15;
    const skip = (req.query.page - 1) * limit;
    const all = await Report.knex()
    const dd = await all.raw(`
    SELECT r.id,
       CONCAT(us.last_name, ' ', us.first_name, ' ', us.middle_name, '') AS sname,
       us.company,
       us.type as dtype,
       us.uid as sid,
       c.number,
       r.created_at, r.time,r.amount
FROM report AS r
LEFT JOIN users us ON us.id = r.user_id
LEFT JOIN contracts c ON c.id = r.contract
WHERE r.type = 1
ORDER BY r.id DESC
LIMIT ${limit} OFFSET ${skip};`)
    const count = await all.raw(`
SELECT r.id,
CONCAT(us.last_name, ' ', us.first_name, ' ', us.middle_name, '') AS sname,
us.company,
us.type as dtype,
us.uid as sid,
c.number,
r.created_at, r.time,r.amount
FROM report AS r
LEFT JOIN users us ON us.id = r.user_id
LEFT JOIN contracts c ON c.id = r.contract
WHERE r.type = 1
ORDER BY r.id DESC`)
    return res.status(200).json({ success: true, data: dd[0], count: count[0].length, exp: count[0], all: count[0] })
}
exports.getPay = async (req, res) => {
    const limit = req.query.limit || 15;
    const skip = (req.query.page - 1) * limit;
    const all = await Report.knex()
    const dd = await all.raw(`
    SELECT r.id,
       CONCAT(us.last_name, ' ', us.first_name, ' ', us.middle_name, '') AS sname,
       us.company,
       us.type as dtype,
       us.uid as sid,
       c.number,
       r.created_at, r.time,r.amount,r.pay
FROM report AS r
LEFT JOIN users us ON us.id = r.user_id
LEFT JOIN contracts c ON c.id = r.contract
WHERE r.type = 4
ORDER BY r.id DESC
LIMIT ${limit} OFFSET ${skip};`)
    const count = await all.raw(`
SELECT r.id,
CONCAT(us.last_name, ' ', us.first_name, ' ', us.middle_name, '') AS sname,
us.company,
us.type as dtype,
us.uid as sid,
c.number,
r.created_at, r.time,r.amount,r.pay
FROM report AS r
LEFT JOIN users us ON us.id = r.user_id
LEFT JOIN contracts c ON c.id = r.contract
WHERE r.type = 4
ORDER BY r.id DESC`)
    return res.status(200).json({ success: true, data: dd[0], count: count[0].length, exp: count[0], all: count[0] })
}
exports.debQarz = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    // let dss;
    // if (req.query.start != '0' && req.query.end != '0') {
    //     dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`
    // } else {
    //     dss = ' '
    // }
    try {
        const candidate = await User.query().findOne('uid', req.params.id)
        const knex = await Contracts.knex();
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
 AND c.${req.query.type} = ${candidate.id}
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
 AND c.${req.query.type} = ${candidate.id}
 AND a.status = 1
ORDER BY c.id DESC`
        );
        return res.status(200).json({ success: true, data: data[0], count: count[0].length });
    } catch (error) {
        console.log(error)
    }
};
exports.getUserContractHisotry = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    try {
        const candidate = await User.query().findOne('uid', req.params.id)
        const knex = await Contracts.knex();
        const data = await knex.raw(
            `	SELECT c.id,
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
     WHERE c.status != 1 AND c.status != 0
       AND c.${req.query.type} = ${candidate.id}
     ORDER BY c.end_date DESC LIMIT ${limit} OFFSET ${skip};`
        );
        const count = await knex.raw(
            `	SELECT c.id,
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
     WHERE c.status != 1 AND c.status != 0
       AND c.${req.query.type} = ${candidate.id}`
        );
        return res.status(200).json({ success: true, data: data[0], count: count[0].length });
    } catch (error) {
        console.log(error)
    }
};
exports.expired = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = (req.query.page - 1) * limit;
    try {
        const candidate = await User.query().findOne('uid', req.params.id)
        // let dss;

        // if (req.query.start != '0' && req.query.end != '0') {
        // 	dss = `AND DATE(c.created_at) BETWEEN '${req.query.start}' AND '${req.query.end}'`
        // } else {
        // 	dss = ' '
        // }

        const knex = await Contracts.knex();
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
  AND c.${req.query.type} = ${candidate.id}
  AND a.status = 1
  AND a.end_date < CURRENT_DATE()
ORDER BY c.id DESC
LIMIT ${limit}
OFFSET ${skip};`
        );
        const count = await knex.raw(`
		SELECT c.id, a.residual_amount,u2.uid as debitor_uid,
		u1.uid as creditor_uid, CONCAT(u2.last_name, ' ', u2.first_name, ' ',u2.middle_name,'') AS debitor_name, CONCAT(u1.last_name, ' ', u1.first_name, ' ',u1.middle_name,'') AS creditor_name, c.amount,c.number, a.inc,a.end_date,c.currency,c.created_at FROM contracts c LEFT JOIN (SELECT * FROM acts a  WHERE id IN (SELECT MAX(id) FROM acts WHERE a.status = 1 GROUP BY contract_id) ) a ON a.contract_id = c.id LEFT JOIN users u1 ON u1.id = c.creditor LEFT JOIN users u2 ON u2.id = c.debitor WHERE c.status = 1 AND c.${req.query.type} = ${candidate.id} AND a.status = 1 AND a.end_date < CURRENT_DATE() ORDER BY c.id DESC;
		`);
        return res.status(200).json({ success: true, data: data[0], count: count[0].length });
    } catch (error) {
        console.log(error);
    }
};
