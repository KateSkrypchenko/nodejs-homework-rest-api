const express = require("express");

const router = express.Router();

const {
  registerUser,
  verifyEmail,
  resendVerifyEmail,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
  updateAvatarUser,
} = require("../../controllers/auth");
const validateBody = require("../../utils/validateBody");
const { schemas } = require("../../models/user");
const { authenticate, upload } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.registerUserSchema),
  registerUser
);

router.get("/verify/:verificationToken", verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.verifyUserSchema),
  resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginUserSchema), loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/current", authenticate, currentUser);
router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionUserSchema),
  updateSubscriptionUser
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarUser
);

module.exports = router;
