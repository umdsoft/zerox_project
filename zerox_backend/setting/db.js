const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/zerox2";
// const url =   "mongodb+srv://umdsoft:Umidbek19952812@cluster0.r3253.mongodb.net/zerox?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      //   useFindAndModify: true,
      //   useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
