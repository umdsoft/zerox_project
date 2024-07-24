const mongoose = require("mongoose");
const ActSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    end_date: { type: Date, required: true },
    refundable_amount: { type: Number },
    residual_amount: { type: Number },
    status: { type: Number, enum: [0, 1, 2], default: 0 }, 
    // 0-Yangi dalolatnoma, 1-ikki taraflama tasdiqlangan dalolatnoma, 2-rad qilingan dalolatnoma
    type: { type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0 },
    // 0-Qarz shartnomasi dalolatnomasi, 1-Qarzni qisman qaytarish bo`yicha dalolatnoma, 2-qarzni to`liq qaytarish bo`yicha dalolatnoma
    // 3- qarz muddatini uzaytirish bo`yicha dalolatnoma, 4-qarzdan to`liq vos kechish bo`yicha dalolatnoma
    // 5-qarzdan qisman vos kechish bo'yicha dalolatnoma
  },
  { timestamps: true }
);

module.exports = mongoose.model("Act", ActSchema);