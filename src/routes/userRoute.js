const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authentication");
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

// Register the route
router.put("/profile", authMiddleware, updateUserProfile);

router.get("/profile", authMiddleware, getUserProfile);
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
