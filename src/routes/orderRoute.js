const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authentication");

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", adminMiddleware, getAllOrders); // Admin
router.post("/", createOrder);
router.get("/:orderId", getOrderById);
router.patch("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;
