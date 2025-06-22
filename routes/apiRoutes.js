const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const ipMiddleware = require("../middlewares/ipMiddleware");

const { register, login } = require("../controllers/authController");
const { updateProfile, updateIP } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.put("/profile", authMiddleware, updateProfile);
router.put("/update-ip", authMiddleware, ipMiddleware, updateIP);

module.exports = router;
