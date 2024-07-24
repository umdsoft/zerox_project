const Notification = require("../../controllers/Notifications");
const router = require("express").Router();
const { protect, authorize, type } = require("../../middleware/auth");

// router.post("/create", Notification.create);
router.get(
  "/me",
  protect, authorize(1), type(1, 2, 89),
  Notification.me
);
//
// router.put('/partially/:token', protect, authorize(1), type(1, 2, 89), Notification.partially)
router.put('/ok/:id', protect, authorize(1), type(1, 2, 89), Notification.ok)
router.put("/success/:id", protect, authorize(1), type(1, 2, 89), Notification.edit);
// router.put('/extension/:id', protect, authorize(1), type(1, 2, 89), Notification.extension)
// router.post('/give-up/:id', protect, authorize(1), type(1, 2, 89), Notification.giveUp)
router.post('/toliq-qaytarish/:id', protect, authorize(1), type(1, 2, 89), Notification.toliqQaytarish)
router.post('/qisman-qaytarish/:id', protect, authorize(1), type(1, 2, 89), Notification.qismanQaytarish)
router.post('/time/:id', protect, authorize(1), type(1, 2, 89), Notification.timeSuccess)
router.post('/reqquest', protect, authorize(1), type(1, 2, 89), Notification.reqquest)
router.get('/by/:id', protect, authorize(1), type(1, 2, 89), Notification.by)
router.post('/eby/:id', protect, authorize(1), type(1, 2, 89), Notification.eby)
module.exports = router;
