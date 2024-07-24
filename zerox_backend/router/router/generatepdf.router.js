const router = require("express").Router();
const controller = require("../../controllers/generatepdf");

router.get('/:id',controller.getContract)

// router.get('/pdf/test',controller.test)
module.exports = router;
