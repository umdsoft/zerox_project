const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    status: { type: Number, enum: [0, 1, 2], default: 0 }, // 0-yangi, 1-qabul qilindi, 2-rad etildi
    hash: { type: String},
    debitor: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    creditor: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    contract: { type: mongoose.Types.ObjectId, ref: "Contract" },
    act: { type: mongoose.Types.ObjectId, ref: "Act" },
    type: { type: Number, enum: [0, 1, 2, 3,4,5,6], default: 0 },
        // 0-Qarz shartnomasi dalolatnomasi, 1-Qarzni qisman qaytarish bo`yicha dalolatnoma, 2-qarzni to`liq qaytarish bo`yicha dalolatnoma
    // 3- qarz muddatini uzaytirish bo`yicha dalolatnoma, 4-qarzdan to`liq vos kechish bo`yicha dalolatnoma
    // 5-qarzdan qisman vos kechish bo'yicha dalolatnoma
    // date: { type: Date, expires: 3600, default: dateTashkent },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notification", NotificationSchema);
//