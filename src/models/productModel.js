const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for product images
const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String },
  is_featured: { type: Boolean, default: false },
});

// Define the schema for product colors
const ColorSchema = new Schema({
  color: { type: String, required: true },
  stock: { type: Number, default: 0 },
  images: [ImageSchema],
});

// Define the main product schema
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    min_price: { type: Number },
    max_price: { type: Number },
    category: { type: String, ref: "Category" },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
