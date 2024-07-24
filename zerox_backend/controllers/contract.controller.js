const Contract = require("../models/contract.model");
const jwt = require("jsonwebtoken");
const Act = require("../models/act.model");
const NotiCon = require("../models/notification.model");
const { createHmac } = require("crypto");
const dates = +new Date();
const secret = process.env.SECRET;
const hash = createHmac("sha256", secret)
  .update(dates.toString())
  .digest("hex");
exports.create = async (req, res) => {
  console.log(req.body);
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

  let num = await Contract.countDocuments({ date: thisDay });
  if (num == null) {
    num == 0;
  }
  const contract = new Contract(req.body);
  contract.number = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}-${num + 1}`;
  contract
    .save()
    .then(async () => {
      const noti = new NotiCon(req.body);
      noti.contract = contract._id;
      noti.hash = hash;
      noti
        .save()
        .then(() => {
          return res.status(200).json({ success: true, noti });
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getContracts = async (req, res) => {
  await Contract.find()
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ sucess: false, err });
      return res.status(200).json({ success: true, data });
    });
};
exports.arrearage = async (req, res) => {
  console.log(req.params.type);
  if (!req.query) {
    return res.status(400).json({ success: false, err: "Query is empty" });
  }
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  let data;
  if (req.params.type == "debitor") {
    data = await Contract.find({
      debitor: candidate.id,
      status: "1",
      end_date: { $lte: new Date() },
    })
      .sort({ createdAt: -1 })
      .skip((req.query.page - 1) * req.query.page)
      .limit(parseInt(req.query.limit))
      .populate(["debitor", "creditor"]);
  } else if (req.params.type == "creditor") {
    data = await Contract.find({
      creditor: candidate.id,
      status: "1",
    })
      .sort({ createdAt: -1 })
      .skip((req.query.page - 1) * req.query.page)
      .limit(parseInt(req.query.limit))
      .populate(["debitor", "creditor"]);
  }
  return res.status(200).json({ success: true, data });
};
exports.getMyContracts = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  await Contract.findOne({
    $and: [
      { _id: req.params.id },
      { $or: [{ debitor: candidate.id }, { creditor: candidate.id }] },
    ],
  })
    .populate(["debitor", "creditor"])
    .exec(async (err, data) => {
      if (err) return res.status(400).json({ sucess: false, err });
      const acts = await Act.find({ contract: data._id }).sort({ type: 0 });
      return res.status(200).json({ success: true, data, acts });
    });
};

exports.restitution = async (req, res) => {
  const act = new Act(req.body);
  act
    .save()
    .then(async () => {
      console.log(act);
      const payload = { act: act._id };
      const token = await jwt.sign(payload, process.env.SECRET);
      const noti = new NotiCon(req.body);
      noti.hash = token;
      noti.act = act._id;
      noti
        .save()
        .then(() => {
          return res.status(201).json({ success: true });
        })
        .catch((err) => {
          return console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.reports = async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  if (req.params.type == "debitor") {
    await Contract.find({ debitor: candidate.id, status: "2" })
      .sort({ createdAt: -1 })
      .skip((req.query.page - 1) * req.query.limit)
      .limit(parseInt(req.query.limit))
      .populate("creditor")
      .exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
      });
  }
  if (req.params.type == "creditor") {
    await Contract.find({ creditor: candidate.id, status: "2" })
      .sort({ createdAt: -1 })
      .skip((req.query.page - 1) * req.query.limit)
      .limit(parseInt(req.query.limit))
      .populate("debitor")
      .exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
      });
  }
};
exports.getActs = async (req, res) => {
  await Act.find({ _id: req.params.id })
    .populate({
      path: "contract",
      populate: { path: "debitor creditor" },
    })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, data });
    });
};
