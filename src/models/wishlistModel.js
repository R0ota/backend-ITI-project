const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    Item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesignedProduct",
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
