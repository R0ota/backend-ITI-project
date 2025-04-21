const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DesignedProduct",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  deliveryAddress: {
    fullName: String,
    phone: String,
    appartment: String,
    floor: String,
    bulding: String,
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  paymentMethod: { type: String, enum: ["card", "cash"], default: "cash" },
  status: { type: String, default: "pending" },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  isDeleted: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
});

module.exports = mongoose.model("Order", OrderSchema);
