const PayMe = require('../../controllers/payment/PayMeController');
const Click = require('../../controllers/payment/ClickController')
const router = require('express').Router();
router.post('/payme', PayMe.payme);
router.post('/click/complete',Click.clickComplete)
router.post('/click/prepare',Click.clickPrepare)
module.exports = router;