const UserController = require("../../controllers/User");
const router = require("express").Router();
const { protect, authorize, type } = require("../../middleware/auth");
const UserArchive = require("../../models/UserArchive");
router.post("/register", UserController.register);
router.post("/legal", UserController.registerLegal);
router.post("/login", UserController.login);
router.post(
  "/search",
  protect,
  authorize(1, 89),
  type(1, 2, 89),
  UserController.search
);
// router.get('/admin/:type', protect, authorize(1, 89), UserController.forAdminJismoniy)
router.get(
  "/admin/user/:id",
  protect,
  authorize(1, 89),
  UserController.forAdminOneJismoniy
);
router.get("/candidate/:id", UserController.forCandidate);
router.get("/me", protect, authorize(1, 89), type(1, 2, 89), UserController.me);
router.get("/get-all-rating", protect, authorize(1, 89), type(1, 2, 89), UserController.getAllRatingStatus);
router.post('/archive',UserController.user_archive)
router.get('/archive/:id',UserController.getUserArchive)
router.post(
  "/transfer",
  protect,
  authorize(1),
  type(1, 2, 89),
  UserController.transfer
);
router.post(
  "/rephone",
  protect,
  authorize(1),
  type(1, 2, 89),
  UserController.editPhone
);
router.post(
  "/edit-password",
  protect,
  authorize(1),
  type(1, 2, 89),
  UserController.editPass
);
router.post(
  "/isactivate",
  protect,
  authorize(1),
  type(1, 2, 89),
  UserController.userActive
);

router.post("/askjshshir", UserController.askJshshir);
router.post("/myidchecking", UserController.active);
router.post("/updatePassword", UserController.updatePassword);
router.post("/phoneChange", UserController.PhoneChange);
router.post("/verifyCode", UserController.Verify);
router.put("/edit_contract", UserController.contractEdit);
router.post("/edit/password", protect, UserController.editPassword);
router.put("/fmt-token", protect, UserController.createFmtToken);

//
//active device routes

router.post("/active-device", protect, UserController.postDeviceId);
router.put("/active-device", protect, UserController.updateDeviceStatus);
router.delete("/close-device", protect, UserController.closeDevice);
router.get("/devices", protect, UserController.getDevices);
router.put("/last-time", protect, UserController.updateLastTime);

module.exports = router;
