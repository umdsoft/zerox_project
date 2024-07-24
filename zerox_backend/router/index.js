const express = require("express");
const app = express();

app.use("/user", require("./router/user.router"));
app.use("/contract", require("./router/contract.router"));
app.use("/dashboard", require("./router/dashboard.router"));
app.use('/home',require('./router/home.router'))
app.use("/generatepdf", require("./router/generatepdf.router"));
app.use("/not", require("./router/notification.router"));
app.use("/arrearage", require("./router/arrearage.router"));
app.use("/notification", require("./router/notification.router"));
app.use('/pay',require('./router/pay.router'))
app.use('/news',require('../router/router/new.router'))
app.use('/version',require('./router/version'))
module.exports = app;
