const express = require("express");
const { updateProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.put(
  "/profile",
  protect,
  upload.single("resume"),
  updateProfile
);

module.exports = router;
