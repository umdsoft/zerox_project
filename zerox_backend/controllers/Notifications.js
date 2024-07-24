const Notification = require("../models/Notifications");
const jwt = require("jsonwebtoken");
const Contract = require("../models/Contracts");
const User = require("../models/Users");
const Act = require("../models/Acts");
const axois = require("axios");
const { rating } = require("../functions/rating");
const { transfer } = require("../helper/transferMoney");
const Currency = require("../models/Currency");

const admin = require("firebase-admin");
const fm = require("fcm-notification");
const key = require("../zerox-c073b-firebase-adminsdk-lwhnu-f2756c39d6.json");
const cert = admin.credential.cert(key);
const FM = new fm(cert);

exports.FM = FM;
let option = (user) => {
  return {
    token: user.rtf_token,
    notification: {
      body: "Yangi bildirishnoma",
      title: "ZeroX",
    },
  };
};

exports.me = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const knex = await Notification.knex();
  const notifications = await knex.raw(`
    SELECT n.id,
    n.type,
    c.number,
    c.created_at,
    c.uid,
    n.created_at AS created,
    n.time,
    n.token,
    creditor.type AS ctypes,
    debitor.type AS dtypes,
    debitor.company AS dcompany,
    creditor.company AS ccopmany,
    creditor.uid AS cuid,
    debitor.uid AS duid,
    creditor.created_at as ccreated,
    debitor.created_at as dcreated,
    CONCAT(debitor.last_name, ' ', debitor.first_name, ' ', debitor.middle_name, '') AS debitor_name,
    CONCAT(creditor.last_name, ' ', creditor.first_name, ' ', creditor.middle_name, '') AS creditor_name,
    a.inc,
    a.refundable_amount,
    a.residual_amount,
    a.vos_summa,
    a.id AS act,
    n.debitor,
    n.creditor,
    n.reciver,
    a.end_date,
    c.amount,
    c.id AS contract,
    c.currency
FROM notifications n
LEFT JOIN users debitor ON debitor.id = n.debitor
LEFT JOIN users creditor ON creditor.id = n.creditor
LEFT JOIN contracts c ON c.id = n.contract
LEFT JOIN acts a ON a.id = n.act
WHERE n.reciver = ${candidate.id}
AND n.status = 0
ORDER BY n.id DESC;
`);

  return res.status(200).json({ success: true, data: notifications[0] });
};
exports.edit = async (req, res) => {
  try {
    if (req.body.stype == 1) {
      const user = await User.query().findOne("id", req.body.creditor);
      const con = await Contract.query().findById(req.body.contract);
      if (con.status != 0) {
        return res.status(200).json({ success: false, msg: "not-con-suc" });
      }
      if (user.cnt > 0) {
        const cnt = user.cnt - 1;
        await User.query()
          .findOne("id", req.body.creditor)
          .update({ cnt: cnt });
        await Notification.query().insert({
          debitor: req.body.debitor,
          creditor: req.body.creditor,
          reciver: req.body.reciver,
          contract: req.body.contract,
          time: new Date(),
          type: 8,
        });
        await Contract.query()
          .findById(req.body.contract)
          .update({ status: 1, approved_time: new Date() });
        await Notification.query().deleteById(req.params.id);
      } else {
        let bb;
        let balanc;
        let sd;
        let amo = 100000;
        let cur_amount;
        const cc = await Contract.query().findOne("id", req.body.contract);
        if (cc.currency == "USD") {
          let ussd;
          await axois
            .get("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
            .then((res) => {
              ussd = res.data[0].Rate;
              bb = Math.floor(cc.amount * ussd * 0.001);
              cur_amount = cc.amount * ussd;
            });
        } else {
          bb = Math.floor(cc.amount * 0.001);
          cur_amount = cc.amount;
        }
        if (cur_amount <= 1000000) {
          balanc = user.balance - 1000;
          sd = 1000;
        } else if (cur_amount >= 100000000) {
          balanc = user.balance - amo;
          sd = amo;
        } else {
          balanc = user.balance - bb;
          sd = bb;
        }

        if (balanc < 0) {
          return res
            .status(400)
            .json({ success: false, err: "You have not enough money" });
        }
        await Notification.query().insert({
          debitor: req.body.debitor,
          creditor: req.body.creditor,
          reciver: req.body.reciver,
          contract: req.body.contract,
          token: sd,
          time: new Date(),
          type: 8,
        });
        await transfer(req.body.creditor, con.id, sd, 1, req.body.creditor, 1);
        await User.query()
          .findById(req.body.creditor)
          .update({ balance: balanc });
        await Contract.query()
          .findById(req.body.contract)
          .update({ status: 1, approved_time: new Date() });
        await Notification.query().deleteById(req.params.id);
      }
      const rec = await User.query().findOne("id", req.body.creditor);
      if (rec) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
    if (req.body.stype == 2) {
      await Notification.query().insert({
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        reciver: req.body.reciver,
        time: new Date(),
        contract: req.body.contract,
        type: 7,
      });
      await Notification.query().deleteById(req.params.id);
      await Contract.query()
        .findOne("id", req.body.contract)
        .update({ status: 3, end_date: new Date(), approved_time: new Date() });
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.ok = async (req, res) => {
  await Notification.query()
    .deleteById(req.params.id)
    .catch((err) => {
      // return res.status(400).json({success: false})
      console.log(err);
    });

  return res.status(200).json({ success: true });
};
exports.timeSuccess = async (req, res) => {
  try {
    if (req.body.stype == 1) {
      await Notification.query().insert({
        type: 12,
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        act: req.body.act,
        time: new Date(),
        contract: req.body.contract,
        reciver: req.body.reciver,
        status: 0,
      });
      await Notification.query().deleteById(req.params.id);
      await Act.query()
        .findById(req.body.act)
        .update({ status: 1, approved_time: new Date() });
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
    if (req.body.stype == 2) {
      await Notification.query().deleteById(req.params.id);
      await Act.query()
        .findById(req.body.act)
        .update({ status: 2, approved_time: new Date() });
      await Notification.query().insert({
        type: 13,
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        act: req.body.act,
        time: new Date(),
        contract: req.body.contract,
        reciver: req.body.reciver,
        status: 0,
      });
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.toliqQaytarish = async (req, res) => {
  try {
    if (req.body.stype == 1) {
      await Notification.query().deleteById(req.params.id);
      await Notification.query().delete().where("contract", req.body.contract);
      await Notification.query().insert({
        type: 10,
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        time: new Date(),
        act: req.body.act,
        contract: req.body.contract,
        reciver: req.body.reciver,
        status: 0,
      });

      // await Act.query()
      //   .findById(req.body.act)
      //   .update({ status: 1, approved_time: new Date() });
      // await Contract.query()
      //   .findOne("id", req.body.contract)
      //   .update({ status: 2, end_date: new Date() });
      await rating(req.body.creditor, req.body.contract, req.body.debitor);
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
    if (req.body.stype == 2) {
      const act = await Act.query()
        .findOne("contract_id", req.body.contract)
        .where("status", 1)
        .orderBy("id", "desc");
      await Notification.query().deleteById(req.params.id);
      await Act.query().findById(req.body.act).update({ status: 2 });
      await Notification.query().insert({
        type: 9,
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        time: new Date(),
        act: act.id,
        contract: req.body.contract,
        reciver: req.body.reciver,
        status: 0,
      });
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.qismanQaytarish = async (req, res) => {
  try {
    if (req.body.stype == 1) {
      await Notification.query().insert({
        type: 11,
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        act: req.body.act,
        time: new Date(),
        contract: req.body.contract,
        reciver: req.body.reciver,
        status: 0,
      });
      const acts = await Act.query()
        .findById(req.body.act)
        .update({ status: 1, approved_time: new Date() });
      if (acts.residual_amount == 0) {
        await Contract.query().findOne("id", req.body.contract).update({
          status: 2,
          end_date: new Date(),
        });
        await rating(req.body.creditor, req.body.contract, req.body.debitor);
      }
      await Notification.query().deleteById(req.params.id);
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
    if (req.body.stype == 2) {
      await Notification.query().deleteById(req.params.id);
      await Act.query()
        .findById(req.body.act)
        .update({ status: 2, approved_time: new Date() });
      const act = await Act.query()
        .findOne("contract_id", req.body.contract)
        .where("status", 1)
        .orderBy("id", "desc");
      await Notification.query().insert({
        type: 15,
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        act: act.id,
        time: new Date(),
        contract: req.body.contract,
        reciver: req.body.reciver,
        status: 0,
      });
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.reqquest = async (req, res) => {
  //   bu route ga murojat bulganda revicer ni idsini olib fcm token orqali notification yuborish kerak.
  try {
    const noti = await Notification.query().insert({
      type: 19,
      debitor: req.body.debitor,
      creditor: req.body.creditor,
      reciver: req.body.reciver,
      time: new Date(),
      timer: new Date().getTime() + 5 * 60000,
      token: new Date().getTime() + 5 * 60000,
      status: 0,
    });
    try {
      const user = await User.query().findOne("id", req.body.reciver);
      if (user) {
        FM.send(option(user), (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response, "response");
        });
      }
    } catch (error) {
      console.log(error);
    }
    return res.status(201).json({ success: true, data: noti });
  } catch (err) {
    console.log(err);
  }
};
exports.by = async (req, res) => {
  try {
    const noti = await Notification.query().findById(req.params.id);
    return res.status(200).json({ success: true, data: noti });
  } catch (err) {
    console.log(err);
  }
};
exports.eby = async (req, res) => {
  try {
    if (req.body.status == 1) {
      await Notification.query().insert({
        type: 30, // ruxsat berdi
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        time: new Date(),
        reciver: req.body.reciver,
        status: 0,
      });
      await Notification.query()
        .deleteById(req.params.id)
        .catch((err) => {
          // return res.status(400).json({success: false})
          console.log(err);
        });
      return res.status(200).json({ success: true });
    }
    if (req.body.status == 2) {
      await Notification.query().insert({
        type: 31, // rad etildi berdi
        debitor: req.body.debitor,
        creditor: req.body.creditor,
        time: new Date(),
        reciver: req.body.reciver,
        status: 0,
      });
      await Notification.query()
        .deleteById(req.params.id)
        .catch((err) => {
          // return res.status(400).json({success: false})
          console.log(err);
        });
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};
