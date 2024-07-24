const router = require("express").Router();
const { protect, authorize, type } = require("../../middleware/auth");
// router.get(
//   "/my/:type",
//   protect,
//   authorize(1),
//   type(1, 2, 89),
//   ContractControlelr.arrearage
// );
// router.get('/deb',protect,authorize(1),type(1,2,89),ContractControlelr.debQarz)
// router.get('/hisobot',protect,authorize(1),type(1,2,89),ContractControlelr.hisobot)
// router.get(
//   "/expired/:type",
//   protect,
//   authorize(1),
//   type(1, 2, 89),
//   ContractControlelr.expired
// );


module.exports = router;
