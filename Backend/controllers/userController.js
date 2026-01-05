const User = require("../models/User");

// @route   PUT /api/users/profile
// @desc    Update user profile & upload resume
// @access  Private
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.profile.phone = req.body.phone || user.profile.phone;
  user.profile.skills = req.body.skills || user.profile.skills;
  user.profile.experience = req.body.experience || user.profile.experience;

  if (req.file) {
    user.profile.resume = req.file.path;
  }

  const updatedUser = await user.save();

  res.json({
    message: "Profile updated successfully",
    profile: updatedUser.profile,
  });
};

module.exports = { updateProfile };
