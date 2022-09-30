const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.get("/verify" , authController.verify);
router.post("/verify_email" , authController.verifyEmail);
router.get("/reset-password" , authController.resetPassword);
router.post("/reset" , authController.reset);

module.exports = router;