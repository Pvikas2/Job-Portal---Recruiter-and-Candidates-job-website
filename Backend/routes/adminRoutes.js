const express = require("express");
const {
  getAllUsers,
  blockUser,
  unblockUser,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/block", protect, adminOnly, blockUser);
router.put("/users/:id/unblock", protect, adminOnly, unblockUser);

module.exports = router;
