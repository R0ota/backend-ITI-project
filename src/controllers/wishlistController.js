const Wishlist = require("../models/wishlistModel");
const AppError = require("../utils/appError");
const DesignedProduct = require("../models/designedProductModel");

const toggleItemToWishList = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const designedProduct = await DesignedProduct.findById(req.params.id);
    if (!designedProduct) throw new AppError("Designed product not found", 404);

    const existingWishlist = await Wishlist.findOne({
      User: userId,
      Item: designedProduct._id,
    });
    if (existingWishlist) {
      await Wishlist.findByIdAndDelete(existingWishlist._id);
      return res.status(200).json({
        message: "Item removed from wishlist successfully",
        data: existingWishlist,
      });
    }

    const wishlist = await Wishlist.create({
      User: userId,
      Item: designedProduct._id,
    });

    res.status(201).json({
      message: "Item added to wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const getWishList = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const wishlistItems = await Wishlist.find({ User: userId }).populate({
      path: "Item",
      populate: [
        { path: "product", model: "Product" },
        { path: "design", model: "Design" },
      ],
    });

    res.status(200).json({
      message: "Wishlist fetched successfully",
      data: wishlistItems,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleItemToWishList,
  getWishList,
};
