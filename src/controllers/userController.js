const User = require("../models/userModel");

// @desc    Get user profile
// @route   GET /user/profile
const getUserProfile = async (req, res) => {
    try {
      const user = await User.findOne(
        {
          _id: req.user._id,
        },
        { password: 0 }
      ); // Exclude password from response
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.send(user);
    } catch (error) {
      res.status(400).send({
        error: error.message,
      });
    }
  };
  
  // @desc    Get all users (Admin only)
  // @route   GET /admin/all
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 }); // Exclude passwords
      res.send(users);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  // @desc    Delete a user (Admin only)
  // @route   DELETE /admin/:id
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  // @desc    Update user profile
  // @route   PUT /user/profile
  const updateUserProfile = async (req, res) => {
    try {
      const updates = req.body;
  
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, projection: { password: 0 } }
      );
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.send({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
module.exports = {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
  };