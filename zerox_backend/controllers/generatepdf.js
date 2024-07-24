const Act = require('../models/Acts');
const Contract = require('../models/Contracts');
const User = require('../models/Users');
exports.getContract = async (req, res) => {
  console.log(req.params.id)
  let contract = await Contract.query().findOne('id',req.params.id)
  const debitor  = await User.query().findOne('id',contract.debitor)
  const creditor  = await User.query().findOne('id',contract.creditor)
  contract.debitor = debitor
  contract.creditor = creditor
  const acts = await Act.query().where('contract_id',req.params.id).andWhere('status',1)
  return res.status(200).json({contract:contract,acts})
};
