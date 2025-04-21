const router = require("express").Router();
const { authMiddleware } = require("../middleware/authentication");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

router.use(authMiddleware);

// @desc    Add product to cart
// @route   POST /cart/add
// @access  Private
router.post("/", addToCart);

// @desc    Get user's cart
// @route   GET /cart
// @access  Private
router.get("/", getCart);

// @desc    Clear cart
// @route   DELETE /cart/clear
// @access  Private
router.delete("/clear", clearCart);

// @desc    Remove product from cart
// @route   DELETE /cart/:id
// @access  Private
router.delete("/:id", removeFromCart);

module.exports = router;
