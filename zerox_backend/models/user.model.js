const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    pinfl: { type: String },
    passport: { type: String },
    gender: { type: String, enum: ["1", "2"] },
    nationality: { type: String },
    citizenship: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: false },
    password: { type: String },
    type: { type: Number, enum: [89, 1, 2], required: true }, // 89-raxbariyat , 1-Yuridik shaxs , 2-jismoniy shaxs
    uid: { type: String, unique: true },
    stir: { type: String },
    balance: { type: Number, default: 10000 },
    role: { type: Number, enum: [89, 1], default: 1 }, // 89 - admin, 1-user
    code: { type: String },
    birthday: { type: String }, // type: 28-12-1995
    rating: { type: Number, default: 0 },
    rating_type: { type: String, enum: ["0", "1"] }, // 0-down, 1-up,

    // timelimit: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
