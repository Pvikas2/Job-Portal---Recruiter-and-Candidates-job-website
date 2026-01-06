const User = require("../models/User");

/**
 * @desc Get all users (Admin only)
 * @route GET /api/admin/users
 * @access Private/Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * @desc Block a user
 * @route PUT /api/admin/users/:id/block
 * @access Private/Admin
 */
const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to block user" });
  }
};

/**
 * @desc Unblock a user
 * @route PUT /api/admin/users/:id/unblock
 * @access Private/Admin
 */
const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isBlocked = false;
    await user.save();

    res.json({ message: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unblock user" });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
};