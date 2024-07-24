const mongoose = require("mongoose");
const ResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    result: { type: Number, required: true },
    type: { type: String, enum: ["0", "1"], required: true }, // 0-down, 1-up
  },
  { timestamps: true }
);
module.exports = mongoose.model("Result", ResultSchema);
