const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const { SMS } = require("../setting/sendSms");
const axios = require("axios").default;
const { genNumber } = require("../setting/idNumber");
const User = require("../models/Users");
const Notification = require("../models/Notifications");
const Transfer = require("../models/Transfer");
const UserArchive = require("../models/UserArchive");
const UserRating = require("../models/UserRating");

const ActiveDevice = require("../models/ActiveDevice");
const { FM } = require("./Notifications");
const { response } = require("express");
// const json = require("../myiduserdata.json");
let messages = ["Pul mablag'i qabul qilinganligi haqida"];

let option = (user, index = 0) => {
  return {
    token: user.rtf_token,
    notification: {
      body: "Yangi bildirishnoma",
      title: "ZeroX",
    },
  };
};

exports.register = async (req, res) => {
  try {
    const lastDate = await Users.query()
      .select("*")
      .orderBy("id", "desc")
      .first();

    const idsss = lastDate ? [`${lastDate.uid}`] : ["100000AA"];
    const num = genNumber(idsss);
    if (req.body.step == 1) {
      const code = Math.floor(Math.random() * 90000) + 10000;
      let txt;
      if (req.body.lang == "uz") {
        txt = `Ro'yxatdan o'tish uchun tasdiqlash kodi`;
      }
      if (req.body.lang == "ru") {
        txt = `Код подтверждения регистрации`;
      }
      if (req.body.lang == "kr") {
        txt = `Рўйхатдан ўтиш учун тасдиқлаш коди`;
      }
      const sms = `ZeroX
      ${txt}: ${code}
      qJrxXbBJxH`;
      const candidate = await Users.query()
        .select("*")
        .where("phone", req.body.phone)
        .first()
        .catch((err) => {
          console.log(err);
        });
      if (candidate && candidate.is_active == 1) {
        console.log("1");
        return res
          .status(200)
          .json({ success: false, message: "user-already-exist" });
      }
      if (candidate && candidate.password !== null && candidate.code == null) {
        return res
          .status(400)
          .json({ success: false, message: "user-already-exist" });
      }
      if (
        candidate &&
        candidate.password === null &&
        candidate.is_active == 0 &&
        candidate.code !== null
      ) {
        await SMS(req.body.phone, sms);
        await Users.query()
          .findOne("phone", req.body.phone)
          .update({ code: code });
        return res.status(200).json({ success: true });
      }

      if (
        candidate &&
        candidate.password === null &&
        candidate.is_active == 2 &&
        candidate.code != null
      ) {
        await SMS(req.body.phone, sms);
        await Users.query()
          .findOne("phone", req.body.phone)
          .update({ code: code });
        return res.status(200).json({ success: true });
      }
      await SMS(req.body.phone, sms);
      await Users.query()
        .insert({
          phone: req.body.phone,
          code,
          uid: num,
          is_active: 2,
          type: req.body.type,
        })
        .then((data) => {
          return res.status(200).json({
            success: true,
            data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // todo::task 2
      if (user) {
        await SMS(req.body.phone, sms);
        return res.status(201).json({ success: true });
      }
    }

    if (req.body.step == 2) {
      const user = await Users.query().where("phone", req.body.phone).first();
      // console.log(user.id)
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "user-not-found" });
      if (
        user.code === null ||
        user.is_active == 1 ||
        user.code != parseInt(req.body.code)
      ) {
        return res.status(400).json({ success: false, message: "code-exit" });
      }
      return res.status(200).json({ success: true });
    }

    if (req.body.step == 3) {
      const user = await Users.query().where("phone", req.body.phone).first();

      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "user-not-found" });
      if (
        user.code === null ||
        user.is_active == 1 ||
        user.code != parseInt(req.body.code)
      ) {
        return res.status(400).json({ success: false, message: "code-exit" });
      }

      const salt = await bcrypt.genSaltSync(12);
      const password = await bcrypt.hashSync(req.body.password, salt);
      // console.log(password)

      Users.query()
        .findOne("phone", req.body.phone)
        .update({
          password,
          code: null,
          is_active: 0,
        })
        .catch((err) => {
          console.log(err);
        });

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({
      success: true,
      message: "not finished yet",
    });
  } catch (error) {}
};
exports.updateCode = async (req, res) => {
  try {
    const user = await Users.query()
      .where("phone", req.body.phone)
      .first()
      .catch((err) => {
        console.log(err);
      });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user-not-found" });
    }
    if (user.isActive === true || user.code === null) {
      return res.status(400).json({ success: false, message: "user-isActive" });
    }
    const code = Math.floor(Math.random() * 90000) + 10000;
    let txt;
    if (req.body.lang == "uz") {
      txt = `Ro'yxatdan o'tish uchun tasdiqlash kodi`;
    }
    if (req.body.lang == "ru") {
      txt = `Код подтверждения регистрации`;
    }
    if (req.body.lang == "kr") {
      txt = `Рўйхатдан ўтиш учун тасдиқлаш коди`;
    }
    const sms = `ZeroX
    ${txt}: ${code}
    qJrxXbBJxH`;
    await SMS(req.body.phone, sms);
    await User.query()
      .findOne("phone", req.body.phone)
      .update({
        code,
      })
      .catch((err) => {
        return console.log(err);
      });
    return res.status(200).json({ success: true });
  } catch (error) {}
};
exports.login = async (req, res) => {
  try {
    const user = await Users.query().where("phone", req.body.phone).first();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user-not-found" });
    }
    if (user.password == null && user.is_active == 2) {
      return res.status(200).json({ success: false, msg: "user-nft" });
    }
    if (user.password == null) {
      return res.status(200).json({ success: false, message: "error" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ success: false, message: "error" });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ success: true, token, sad: user.id });
  } catch (error) {}
};
exports.search = async (req, res) => {
  try {
    if (req.body.type == 1) {
      const user = await Users.query()
        .where("uid", req.body.id)
        .andWhere("brithday", req.body.brithday)
        .first();
      if (!user) {
        return res.status(400).json({ success: false, message: "not-found" });
      }
      return res.status(200).json({ success: true, user });
    }
    if (req.body.type == 2) {
      const user = await Users.query()
        .where({ uid: req.body.id })
        .andWhere({ stir: req.body.stir })
        .first();
      if (!user) {
        return res.status(400).json({ success: false, message: "not-found" });
      }
      return res.status(200).json({ success: true, user });
    }
    return res.status(200).json({});
  } catch (error) {}
};
exports.user_archive = async (req, res) => {
  try {
    await UserArchive.query().insert({
      ip_address: req.body.ip,
      device: req.body.device,
      user_id: req.body.user_id,
      time: new Date(),
      region: req.body.region,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return console.log(error);
  }
};
exports.getUserArchive = async (req, res) => {
  const archive = await UserArchive.query()
    .where("user_id", req.params.id)
    .orderBy("id", "desc")
    .limit(20);
  return res.status(200).json({ success: true, data: archive });
};
exports.me = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await Users.query().findOne("id", candidate.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {}
};
exports.userActive = async (req, res) => {
  try {
    const { code } = req.body;
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const userData = await Users.query().findOne("id", candidate.id);
    if (!userData) {
      return res.status(400).json({ success: false, error: "user-not-found" });
    }
    if (userData.is_active == 1) {
      return res.status(400).json({ success: false, error: "user-isActive" });
    }
    const t = process.env.CLIENT_ID;
    const d = process.env.CLIENT_SECRET;

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_id", t);
    params.append("client_secret", d);
    axios({
      method: "POST",
      url: "https://myid.uz/api/v1/oauth2/access-token",
      data: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        const { access_token } = resp.data;
        axios
          .get("https://myid.uz/api/v1/users/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(async (response) => {
            const cond = await User.query().findOne(
              "pinfl",
              response.data.profile.common_data.pinfl
            );
            if (cond != null) {
              return res
                .status(200)
                .json({ success: false, msg: "user-is-active" });
            }

            await Users.query()
              .findOne("id", candidate.id)
              .update({
                is_active: 1,
                first_name: response.data.profile.common_data.first_name,
                last_name: response.data.profile.common_data.last_name,
                middle_name: response.data.profile.common_data.middle_name,
                brithday: response.data.profile.common_data.birth_date,
                pinfl: response.data.profile.common_data.pinfl,
                stir: null,
                passport: response.data.profile.doc_data.pass_data,
                gender: response.data.profile.common_data.gender,
                nationality: response.data.profile.common_data.nationality,
                citizenship: response.data.profile.common_data.citizenship,
                address: response.data.profile.address.permanent_address,
                issued_date: response.data.profile.doc_data.issued_date
                  ?.split(".")
                  ?.reverse()
                  ?.join("-"),
                issued_by: response.data.profile.doc_data.issued_by,
                region:
                  response.data.profile.address.permanent_registration.region,
                district:
                  response.data.profile.address.permanent_registration.district,
                expiry_date: response.data.profile.doc_data.expiry_date
                  ?.split(".")
                  ?.reverse()
                  ?.join("-"),
                cnt: 5,
                is_contract: 0,
                code: null,
              })
              .then(() => {
                Notification.query()
                  .insert({
                    debitor: candidate.id,
                    time: new Date(),
                    reciver: candidate.id,
                    creditor: candidate.id,
                    type: 25,
                  })
                  .catch((err) => {
                    console.log(err, "notification");
                    return res.status(400).json({
                      success: false,
                      code: 2,
                    });
                  });
                return res.status(200).json({ success: true });
              })
              .catch((err) => {
                console.log(err, "birinchi");
                return res.status(400).json({ success: false, err: err });
              });
          })
          .catch((err) => {
            console.log(err, "ikkinchi");
            return res.status(400).json({ success: false, err });
          });
      })
      .catch((err) => {
        console.log(err, "uchunchi");
        return res.status(400).json({ success: false, err });
      });
  } catch (error) {
    console.log(error, "try");
    return res.status(400).json({ success: false, err });
  }
};
exports.transfer = async (req, res) => {
  try {
    const paye = await User.query().findOne("uid", req.body.user_id);
    if (!paye) {
      return res.status(200).json({ success: false, message: "not-user" });
    }
    if (paye.is_active == 0) {
      return res
        .status(200)
        .json({ success: false, message: "user_not_active" });
    }
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.query().findOne("id", candidate.id);
    if (paye.id == user.id) {
      return res.status(200).json({ success: false, message: "all-user" });
    }
    if (user.balance < req.body.amount) {
      return res.status(200).json({ success: false, message: "enouth-money" });
    } else {
      const money = user.balance - parseInt(req.body.amount);
      await User.query().findOne("id", candidate.id).update({ balance: money });
      await Transfer.query().insert({
        amount: req.body.amount,
        dublicate: 1,
        type: 2,
        user_id: candidate.id,
        reciver: paye.id,
        all: 1,
      });
      const payee = await User.query().findOne("uid", req.body.user_id);
      const lastMoney = payee.balance + parseInt(req.body.amount);
      await Notification.query().insert({
        reciver: candidate.id,
        debitor: candidate.id,
        creditor: payee.id,
        type: 23,
        token: req.body.amount,
        time: new Date(),
        status: 0,
      });
      await User.query()
        .findOne("uid", req.body.user_id)
        .update({ balance: lastMoney });
      await Transfer.query().insert({
        amount: req.body.amount,
        dublicate: 0,
        type: 3,
        user_id: paye.id,
        reciver: candidate.id,
        all: 0,
      });
      await Notification.query().insert({
        reciver: payee.id,
        debitor: candidate.id,
        creditor: payee.id,
        type: 24,
        time: new Date(),
        token: req.body.amount,
        status: 0,
      });

      FM.send(option(payee, 0), (error, resoponse) => {
        if (error) {
          // console.log(error);
        }
        console.log(response, "response");
      });

      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
exports.forAdminJismoniy = async (req, res) => {
  try {
    return res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};
exports.forCandidate = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await Users.query().findOne("uid", req.params.id);

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
  }
};
exports.forAdminOneJismoniy = async (req, res) => {
  try {
    const user = await Users.query().findOne("uid", req.params.id);
    console.log(user);
    return res.status(200).json({ success: true, data: user });
    // return res.status(200).json({})
  } catch (error) {}
};
exports.registerLegal = async (req, res) => {
  try {
    const code = Math.floor(Math.random() * 90000) + 10000;

    const candidate = await User.query().findOne("stir", req.body.stir);
    if (!candidate) {
      const lastDat = await User.query()
        .select("*")
        .orderBy("id", "desc")
        .first();
      const idsss = lastDat ? [`${lastDat.uid}`] : ["100000AA"];
      const num = genNumber(idsss);
      await User.query()
        .insert({
          type: 1,
          uid: num,
          stir: req.body.stir,
          company: req.body.company,
          address: req.body.address,
          director: req.body.director,
          is_active: 0,
        })
        .catch((err) => console.log(err));
      return res.status(200).json({ success: true, message: "not-active" });
    }
    if (
      req.body.status == 1 &&
      candidate.type == 1 &&
      candidate.is_active == 0
    ) {
      console.log("status: 1");
      await User.query().findOne("id", candidate.id).update({
        phone: req.body.phone,
        code: code,
      });
      let txt;
      if (req.body.lang == "uz") {
        txt = `Ro'yxatdan o'tish uchun tasdiqlash kodi`;
      }
      if (req.body.lang == "ru") {
        txt = `Код подтверждения регистрации`;
      }
      if (req.body.lang == "kr") {
        txt = `Рўйхатдан ўтиш учун тасдиқлаш коди`;
      }
      const sms = `ZeroX
      ${txt}: ${code}
      qJrxXbBJxH`;
      // await SMS(candidate.phone, sms);
      return res.status(200).json({ success: true, message: "code-send" });
    }
    if (
      req.body.status == 2 &&
      candidate.type == 1 &&
      candidate.is_active == 0
    ) {
      console.log("status: 2");
      if (req.body.code != candidate.code) {
        return res.status(400).json({ success: false, message: "code-error" });
      }
      await User.query()
        .findOne("id", candidate.id)
        .update({ is_active: 1, code: null });
      const payload = { id: candidate.id };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({ success: true, token });
    }
    if (candidate.is_active == true && candidate.type == 1) {
      const payload = { id: candidate.id };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(200).json({ success: true, message: "not-active" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.editPhone = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.query().findOne("phone", req.body.phone);
    const code = Math.floor(Math.random() * 90000) + 10000;
    if (user) {
      return res.status(200).json({ success: false, msg: "user-allow" });
    }
    if (req.body.step == 1) {
      let txt;
      if (req.body.lang == "uz") {
        txt = `Ro'yxatdan o'tish uchun tasdiqlash kodi`;
      }
      if (req.body.lang == "ru") {
        txt = `Код подтверждения регистрации`;
      }
      if (req.body.lang == "kr") {
        txt = `Рўйхатдан ўтиш учун тасдиқлаш коди`;
      }
      const sms = `ZeroX
      ${txt}: ${code}
      qJrxXbBJxH`;
      await SMS(req.body.phone, sms);
      await User.query().findOne("id", candidate.id).update({
        code: code,
      });
      return res.status(200).json({ success: true, msg: "send-code" });
    }
    if (req.body.step == 2) {
      if (req.body.code != user.code) {
        return res.status(200).json({ success: true, msg: "no-code" });
      }
      await User.query().findOne("id", candidate.id).update({
        phone: req.body.phone,
        code: null,
      });
      return res.status(200).json({ success: true, msg: "success" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
exports.editPass = async (req, res) => {
  try {
    console.log(req.body);
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.query().findOne("id", candidate.id);
    if (user) {
      const salt = await bcrypt.genSaltSync(12);
      const password = await bcrypt.hashSync(req.body.password, salt);
      if (!bcrypt.compareSync(req.body.old, user.password)) {
        return res.status(200).json({ success: false, msg: "err" });
      }
      await User.query().findOne("id", candidate.id).update({
        password: password,
      });
      return res.status(200).json({ success: true, msg: "suc-password" });
    }
    return res.status(200).json({ success: false, msg: "err-secret" });
  } catch (error) {
    console.log(error);
  }
};
exports.askJshshir = async (req, res) => {
  const { jshshir } = req.body;

  //code 0 user not found
  //code 1 balance yetmaydi
  try {
    const user = await User.query().findOne("pinfl", jshshir);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, msg: "user not found", code: 0 });
    }
    if (Number(user.balance) >= 2300) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({
        success: false,
        msg: "insufficient funds",
        code: 1,
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error, success: false });
  }
};
exports.active = async (req, res) => {
  const { code, jshshir } = req.body;

  try {
    const userData = await Users.query().findOne("pinfl", jshshir);

    if (!userData) {
      return res.status(200).json({ success: false, error: "user-not-found" });
    }

    const t = process.env.CLIENT_ID;
    const d = process.env.CLIENT_SECRET;

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_id", t);
    params.append("client_secret", d);
    axios({
      method: "POST",
      url: "https://myid.uz/api/v1/oauth2/access-token",
      data: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((value) => {
        const { access_token } = value.data;
        axios
          .get("https://myid.uz/api/v1/users/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(async (response) => {
            //code 3 user teng emas
            // code 1 user teng
            if (response.data.profile.common_data.pinfl == userData.pinfl) {
              // type 4 bulsa parolni recovery qilganda chiqadigan report
              await User.query()
                .findOne("pinfl", jshshir)
                .update({ balance: Number(userData.balance) - 2500 });
              Transfer.query()
                .insert({
                  amount: 2500,
                  dublicate: 1,
                  type: 5,
                  user_id: userData.id,
                  reciver: userData.id,
                  all: 1,
                })
                .then(() => {
                  res.status(200).json({
                    success: true,
                    msg: "user equal",
                    data: userData,
                    code: 1,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    success: false,
                    code: 2,
                  });
                });
            } else {
              res
                .status(200)
                .json({ success: false, msg: "user not equal", code: 3 });
            }
          })
          .catch((err) => {
            return res.status(200).json({ success: false, msg: err });
          });
      })
      .catch((err) => {
        return res.status(200).json({ success: false, msg: err });
      });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error });
  }
};

exports.updatePassword = async (req, res) => {
  //1 user not found
  const { password, jshshir } = req.body;
  try {
    const userData = await User.query().findOne("pinfl", jshshir);
    if (userData) {
      const salt = await bcrypt.genSaltSync(12);
      const hasPas = await bcrypt.hashSync(password, salt);

      Users.query()
        .findOne("pinfl", jshshir)
        .update({
          password: hasPas,
        })
        .catch((err) => {
          console.log(err);
        });

      Notification.query()
        .insert({
          debitor: userData.id,
          time: new Date(),
          reciver: userData.id,
          creditor: userData.id,
          type: 26,
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            code: 2,
          });
        });

      return res.status(200).json({ success: true });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "user not found", code: 1 });
    }
  } catch (error) {}
};

exports.PhoneChange = async (req, res) => {
  const { phone } = req.body;
  try {
    const code = Math.floor(Math.random() * 90000) + 10000;
    let txt;
    if (req.body.lang == "uz") {
      txt = `Ro'yxatdan o'tish uchun tasdiqlash kodi`;
    }
    if (req.body.lang == "ru") {
      txt = `Код подтверждения регистрации`;
    }
    if (req.body.lang == "kr") {
      txt = `Рўйхатдан ўтиш учун тасдиқлаш коди`;
    }
    const sms = `ZeroX
      ${txt}: ${code}
      qJrxXbBJxH`;
    await SMS(req.body.phone, sms);
    await Users.query().findOne("phone", phone).update({ code: code });
    return res.status(200).json({ success: true, msg: "sms send" });
  } catch (error) {
    return res.status(400).json({ error: error, success: false });
  }
};

exports.Verify = async (req, res) => {
  const { phone, code } = req.body;
  try {
    const user = await User.query().findOne("phone", phone);
    if (Number(user.code) === Number(code)) {
      return res.status(200).json({ success: true, msg: "code correct" });
    } else {
      return res.status(200).json({ success: false, msg: "code incorrect" });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};
exports.contractEdit = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  try {
    const date = new Date();
    await User.query()
      .findOne("id", candidate.id)
      .update({ is_contract: 1, contract_date: date, con_time: date });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

exports.editPassword = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const { prevPass, newPass } = req.body;
  try {
    const user = await User.query().findOne("id", candidate.id);
    if (user) {
      if (!bcrypt.compareSync(prevPass, user.password)) {
        //code 1 bulsa joriy parol notogri
        return res.status(400).json({ success: false, code: 1 });
      } else {
        const salt = await bcrypt.genSaltSync(12);
        const password = await bcrypt.hashSync(newPass, salt);
        await User.query()
          .findOne("id", candidate.id)
          .update({
            password,
          })
          .then(() => {
            //code 2 bulsa parol uzgardi
            return res.json({ success: true, code: 2 });
          })
          .catch(() => {
            // code 3 bulsa parolni uzgartirishda xato
            return res.json({ success: false, code: 3 });
          });
      }
    } else {
      // code 0 bulsa user not found error code
      return res.json({ code: 0, success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

exports.createFmtToken = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const { fmt_token } = req.body;
  try {
    const user = await User.query().findOne("id", candidate.id);
    if (user) {
      await User.query()
        .findOne("id", candidate.id)
        .update({
          rtf_token: fmt_token,
        })
        .then(() => {
          //code 1 bulsa success
          return res.json({ success: true, code: 1 });
        })
        .catch(() => {
          // code 2 bulsa xatolik uzgartirishda xato
          return res.json({ success: false, code: 2 });
        });
    }
  } catch (error) {
    throw error;
  }
};

exports.postDeviceId = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const {
    device_id,
    os_type,
    device_name,
    system_version,
    ip_address,
    active,
    last_time,
    location,
  } = req.body;
  console.log(req.body, "request");
  try {
    const knex = ActiveDevice.knex();
    const a = await knex.raw(
      `INSERT INTO active_device (user_id,device_name,device_id,os_type,system_version,ip_address,active,last_time,location) VALUES ('${candidate.id}','${device_name}','${device_id}','${os_type}','${system_version}','${ip_address}','${active}','${last_time}','${location}')`
    );
    // const active_sessions = await ActiveDevices.query().insert({
    //   device_id,
    //   os_type,
    //   system_version,
    //   ip_address,
    //   active,
    //   last_time,
    //   location,
    //   device_name,
    //   user_id: candidate.id,
    // });

    return res.status(201).json({ data: a[0], success: true });
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

exports.updateDeviceStatus = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const { status, device_id } = req.body;
  try {
    const data = await ActiveDevice.query()
      .findOne("device_id", device_id)
      .update({ active: status });
    return res.status(200).json({ data: data[0], success: true });
  } catch (error) {
    throw error;
  }
};
exports.closeDevice = async (req, res) => {
  const { device_ids } = req.body;
  console.log(device_ids, "value");
  try {
    const data = await ActiveDevice.query().whereIn("id", device_ids).del();
    return res.status(200).json({ data: data[0], success: true });
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};
exports.getDevices = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

  try {
    const knex = ActiveDevice.knex();
    const data = await knex.raw(
      `SELECT * from active_device WHERE user_id = ${candidate.id}`
    );
    return res.status(200).json({ data: data[0], success: true });
  } catch (error) {
    throw error;
  }
};

exports.updateLastTime = async (req, res) => {
  const { device_id } = req.body;
  const date = new Date();
  const bb = date.toISOString().slice(0, 19).replace("T", " ");
  try {
    const data = await ActiveDevice.query()
      .findOne("device_id", device_id)
      .update({ last_time: bb });
    return res.status(200).json({ data: data[0], success: true });
  } catch (error) {
    throw error;
  }
};

exports.getAllRatingStatus = async (req, res) => {
  try {
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const rating = await UserRating.query()
      .where("user", candidate.id)
      .orderBy("id", "desc");
    return res.status(200).json({ success: true, data: rating });
  } catch (e) {
    return console.log(e);
  }
};
