const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    location: {type: String, required: true},
    type: {type: String, enum:['web','android','ios'],required: true},
    socket_id:{type: String, required: true},
    device: {type :String, required: true}, // Qurilma nomi
    status: {type: Boolean, default: true}
},{timestamps: true})

module.exports = mongoose.model('Device',DeviceSchema)
