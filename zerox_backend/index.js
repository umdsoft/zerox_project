require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cron = require("node-cron");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const jwt = require("jsonwebtoken");
const { cronJob, delNoti, minus_rating } = require("./setting/removeCron");
const ActiveDevice = require("./models/ActiveDevice");
let { Server } = require("socket.io");
const io = new Server(http, { cors: { origin: "*" } });
//Setting
// delNoti();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("tiny"));
app.use("/docs", express.static(path.join(__dirname, "docs")));
cronJob();
minus_rating();

const Notification = require("./models/Notifications");
const User = require("./models/Users");
app.use("/api/v1", require("./router/index"));

// app.get("/", (req, res) => {
// 	res.redirect("https://zerox.uz")
// })

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (token) {
//     next();
//   }
// });

io.on("connection", function (socket) {
  socket.emit("socket", "connected");
  console.log(socket.id, "id");
  socket.on("me", async (data) => {
    console.log(data);
  });
  socket.on("notification", async function (data) {
    const knexU = await User.knex();
    const user = await knexU.raw(
      `SELECT u.id, u.balance FROM users as u WHERE u.is_active = 1;`
    );
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
    creditor.created_at as ccreated,
    debitor.created_at as dcreated,
    creditor.uid AS cuid,
    debitor.uid AS duid,
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
    c.currency FROM notifications n LEFT JOIN users debitor on debitor.id = n.debitor LEFT JOIN users creditor on creditor.id = n.creditor LEFT JOIN contracts c ON c.id = n.contract
LEFT JOIN acts a ON a.id = n.act  WHERE n.status = 0 ORDER BY n.id DESC
`);
    const dds = {
      pps: user[0],
      not: notifications[0],
      resiv: data.userId,
    };
    io.emit("notification", dds);
  });
  socket.on("query", async (data) => {
    console.log(data);
    const daat = {
      bs: "123"
    }
    io.emit("query", daat);
  });
  socket.on("active_sessions", async (data) => {
    // await ActiveDevice.query().insert({
    //   user_id: data.user_id,
    //   device: data.device,
    //   ip: data.ip,
    //   location: data.location,
    //   connect_id: socket.id,
    //   version: data.version
    // })
    // const dds = await ActiveDevice.query().orderBy('id', 'DESC')
    // io.emit("active_sessions", dds);
  });
  socket.on("me", async (data) => {
    const knex = await User.knex();
    const user = await knex.raw(
      `SELECT u.id, u.balance FROM users as u WHERE u.is_active = 1;`
    );
    const not = await Notification.query().orderBy("id", "DESC");
    const me = {
      pps: user[0],
      pps2: not,
    };
    io.emit("me", me);
  });
  // socket.on("disconnect", async function (data) {
  //   await ActiveDevice.query().where("connect_id", socket.id).del();
  //   const dds = await ActiveDevice.query().orderBy("id", "DESC");
  //   io.emit("active_sessions", dds);
  // });
});
cron.schedule("* * * * * *", async () => {
  const dd = await Notification.query().where("type", 19);
  dd.forEach(async (item) => {
    if (parseInt(item.timer) < new Date().getTime()) {
      await Notification.query().deleteById(item.id);
    }
  });
  // io.on("connection", (socket) => {

  //   socket.on("notification", async function (data) {
  //     const knexU = await User.knex();
  //     const user = await knexU.raw(
  //       `SELECT u.id, u.balance FROM users as u WHERE u.is_active = 1;`
  //     );
  //     const knex = await Notification.knex();
  //     const notifications = await knex.raw(`
  //     SELECT n.id,
  //     n.type,
  //     c.number,
  //     c.created_at,
  //     c.uid,
  //     n.created_at AS created,
  //     n.time,
  //     n.token,
  //     creditor.type AS ctypes,
  //     debitor.type AS dtypes,
  //     debitor.company AS dcompany,
  //     creditor.company AS ccopmany,
  //     creditor.uid AS cuid,
  //     debitor.uid AS duid,
  //     CONCAT(debitor.last_name, ' ', debitor.first_name, ' ', debitor.middle_name, '') AS debitor_name,
  //     CONCAT(creditor.last_name, ' ', creditor.first_name, ' ', creditor.middle_name, '') AS creditor_name,
  //     a.inc,
  //     a.refundable_amount,
  //     a.residual_amount,
  //     a.vos_summa,
  //     a.id AS act,
  //     n.debitor,
  //     n.creditor,
  //     n.reciver,
  //     a.end_date,
  //     c.amount,
  //     c.id AS contract,
  //     c.currency FROM notifications n LEFT JOIN users debitor on debitor.id = n.debitor LEFT JOIN users creditor on creditor.id = n.creditor LEFT JOIN contracts c ON c.id = n.contract
  // LEFT JOIN acts a ON a.id = n.act  WHERE n.status = 0 ORDER BY n.id DESC
  // `);
  //     const dds = {
  //       pps: user[0],
  //       not: notifications[0],
  //       resiv: data.userId,
  //     };
  //     io.emit("notification", dds);
  //   });
  // });
});

http.listen(5000, () => {
  io.on("connection", (socket) => {
    console.log("connet: " + socket.id);
  });
  console.log("Server running");
});
