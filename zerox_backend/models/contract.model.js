const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    number: { type: String, required: true },
    end_date: { type: Date, required: true },
    // start_date: { type: Date, required: true },
    status: { type: String, enum: ["0", "1", "2"], default: "0" }, // 0- Yangi shartnoma, 1-ikki tomonlama tasdiqlangan shartnoma, 2-tugallangan shartnoma
    type: { type: String, enum: ["0", "1"], required: true },
    debitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contract", ContractSchema);
