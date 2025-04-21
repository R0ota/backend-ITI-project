const Cart = require("../models/cartModel");
const DesignedProduct = require("../models/designedProductModel");
const AppError = require("../utils/appError");

// @desc    Add product to cart
// @route   POST /cart/add
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { designedProductId, quantity } = req.body;
    const product = await DesignedProduct.findById(designedProductId);
    if (!product) throw new AppError("Product not found", 404);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [], totalPrice: 0 });
    }

    const existingProductIndex = cart.items.findIndex(
      (p) => p.product.toString() === designedProductId
    );
    if (existingProductIndex !== -1) {
      cart.items[existingProductIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: designedProductId,
        quantity,
        price: product.price,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (total, p) => total + p.price * p.quantity,
      0
    );

    await cart.save();
    res.json({ message: "Product added to cart", data: cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's cart
// @route   GET /cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart)
      return res.status(404).json({
        message: "Cart retrieved",
        data: {
          _id: "",
          user: userId,
          totalPrice: 0,
          items: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

    res.json({ message: "Cart retrieved", data: cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product or reduce quantity from cart
// @route   DELETE /cart/remove
// @access  Private
const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.id
    );

    if (productIndex === -1) {
      throw new AppError("Product not found in cart", 404);
    }

    cart.items.splice(productIndex, 1);

    // Recalculate the total price
    cart.totalPrice = cart.items.reduce(
      (total, p) => total + p.price * p.quantity,
      0
    );

    await cart.save();
    res.json({ message: "Product updated in cart", data: cart });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.json({ message: "Cart cleared", data: cart });
  } catch (error) {
    next(error);
  }
};
module.exports = { addToCart, getCart, removeFromCart, clearCart };
