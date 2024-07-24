const router = require("express").Router();
const Contract = require("../../controllers/Contract");
const { protect, authorize, type } = require("../../middleware/auth");

router.post('/create', Contract.create)
router.get("/all", Contract.getContracts);
// router.post("/create", protect, authorize(1), type(1, 2, 89), Contract.create);
router.get('/by/:id', protect, authorize(1), type(1, 2, 89), Contract.getById)
// router.get("/all", protect, authorize(1), type(1, 2, 89), Contract.getContracts);
// router.get('/last/:id', protect, authorize(1), type(1, 2, 89), Contract.lastAct)
router.post("/act", protect, authorize(1), Contract.restitution);
router.post("/talab", protect, authorize(1), Contract.talabQilish);
router.post('/vos-kechish', protect, authorize(1), Contract.toliqVosKechish)
router.get('/oldi-bardi', protect, authorize(1), Contract.oldiBardi)
router.get('/oldi-bardi/search', protect, authorize(1), Contract.oldiBardiSearch)
router.post('/deb-uzay', protect, authorize(1), Contract.debUzay)
// router.get('/acts/get/:id', protect, authorize(1), Contract.getActs)
router.get('/get/usd', protect, authorize(1), Contract.getUsd)
router.get('/return', protect, authorize(1), Contract.debQarz)
router.get('/exp-return', protect, authorize(1),Contract.debQarzExport)
router.get('/return/search', protect, authorize(1), Contract.searchDebQarz)
router.get('/expired',protect,authorize(1),Contract.expired)
router.get('/exp-expired',protect,authorize(1),Contract.expiredExport)
router.get('/expired/search',protect,authorize(1),Contract.expiredSearch)
router.get('/near',protect,authorize(1),Contract.near)
router.get('/exp-near',protect,authorize(1),Contract.nearExport)
router.get('/near/search',protect,authorize(1),Contract.nearSearch)
router.get('/report',protect,authorize(1),Contract.reports)
router.get('/exp-report',protect,authorize(1),Contract.reportsExport)
router.get('/reports/:id',protect,authorize(1),Contract.reportOne)
router.get('/report/search',protect,authorize(1),Contract.reportsSearch)
// router.get('/admin/:type/:id', protect, authorize(1), type(1, 2, 89), Contract.forAdminContract)
router.get('/admin/contract/:id', protect, authorize(1), type(1, 2, 89), Contract.forAdminOneContract)
router.get('/admin/creditor/:id', protect, authorize(1), type(1, 2, 89), Contract.forAdminOneContract)

module.exports = router;
