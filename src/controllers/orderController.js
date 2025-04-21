const Order = require("../models/orderModel");
const Cart=require("../models/cartModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");


const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // assuming you’re using auth middleware
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      }
    });
    console.log(cart);
    if (!cart || cart.items.length === 0) throw new AppError("Cart is empty", 400);

    let totalPrice = 0;
    const orderItems = [];

    // for (const item of cart.items) {
    //   const product = item.product;
    //   const colorVariant = product.colors.find(c => c.color === item.color);
    //   if (!colorVariant || colorVariant.stock < item.quantity) {
    //     return res.status(400).json({ message: `Not enough stock for ${product.name} (${item.color})` });
    //   }

    //   colorVariant.stock -= item.quantity;
    //   await product.save();

    //   totalPrice += product.price * item.quantity;

    //   orderItems.push({
    //     product: product._id,
    //     color: item.color,
    //     quantity: item.quantity,
    //     price: product.price
    //   });
    // }

    // const newOrder = await Order.create({
    //   user: userId,
    //   items: orderItems,
    //   totalPrice,
    //   deliveryAddress: req.body.deliveryAddress
    // });

    // // Optional: Clear cart after ordering
    // await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });

    res.status(201).json({ message: "Order placed successfully", });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product", "name price");
    if (!orders) return res.status(404).json({ message: "No orders found" });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Orders for Specific User
const getUserOrders = async (req, res) => {
  try {
    const  userId  = req.user._id;
    const orders = await Order.find({ user: userId }).populate("items.product", "name price");
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user", "name").populate("items.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Order (status, payment, etc.)
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updates = req.body; // status, isPaid, paidAt, etc.

    const order = await Order.findByIdAndUpdate(orderId, updates, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
