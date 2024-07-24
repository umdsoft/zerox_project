const Transfer = require('../models/Transfer')
exports.transfer = async (user, contract, amount, type, reciver, all) => {
    await Transfer.query().insert({
        amount, type, contract, user_id: user, reciver, all
    })
}

