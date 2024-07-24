const router = require("express").Router();
const Dashboard = require('../../controllers/Dashboard');

router.get('/statistic', Dashboard.getStatistic);
router.get('/contracts', Dashboard.getAllContracts);
router.get('/contract/debitor/:id',Dashboard.getDebitorContract)
router.get('/contract/creditor/:id',Dashboard.getCreditorContract)
router.get('/users/:id', Dashboard.getUsers);
router.get('/trasfer/money-transfer',Dashboard.getTransferSum)
router.get('/trasfer/paid',Dashboard.getTransferMob)
router.get('/trasfer/pay',Dashboard.getPay)
router.get('/con/history/:id',Dashboard.debQarz)
router.get('/con/hisobot/:id',Dashboard.getUserContractHisotry)
router.get('/con/ex-history/:id',Dashboard.expired)
module.exports = router