const mongoose = require('mongoose')

const TransferSchema = new mongoose.Schema({
    remitter: { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true},
    payee: { type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true},
    amount: {type: Number, required: true},
    type: {type: Number,enum:[0,1],required: true} // 0-pul yechildi, 1-pul qabul qilindi
},{timestamps: true})

module.exports = mongoose.model('Transfer',TransferSchema)