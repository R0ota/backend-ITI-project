const DesignedProduct = require("../models/designedProductModel");
const Design = require("../models/designModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

const createDesignedProduct = async (req, res, next) => {
  try {
    const { productId, designId, ...rest } = req.body;
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);
    const design = await Design.findById(designId);
    if (!design) throw new AppError("Design not found", 404);
    const existingDesignedProduct = await DesignedProduct.findOne({
      product: productId,
      design: designId,
      isDeleted: false,
    });
    if (existingDesignedProduct)
      throw new AppError("Designed product already exists", 400);
    const designedProduct = await DesignedProduct.create({
      ...rest,
      product: productId,
      design: designId,
    });
    res.status(201).json({
      message: "Designed product created successfully",
      data: designedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDesignedProducts = async (req, res, next) => {
  try {
    const designedProducts = await DesignedProduct.find()
      .populate("product")
      .populate("design");
    res.status(200).json({
      data: {
        message: "Designed products retrieved successfully",
        data: designedProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getDesignedProductById = async (req, res, next) => {
  try {
    const designedProduct = await DesignedProduct.findById(req.params.id)
      .populate("product")
      .populate("design");
    if (!designedProduct) throw new AppError("Designed product not found", 404);
    res.status(200).json({
      message: "Designed product retrieved successfully",
      data: designedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updateDesignedProduct = async (req, res, next) => {
  try {
    const designedProduct = await DesignedProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!designedProduct) throw new AppError("Designed product not found", 404);
    res.status(200).json({
      message: "Designed product updated successfully",
      data: designedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDesignedProduct = async (req, res, next) => {
  try {
    const designedProduct = await DesignedProduct.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!designedProduct) throw new AppError("Designed product not found", 404);
    res.status(200).json({
      message: "Designed product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDesignedProduct,
  getAllDesignedProducts,
  getDesignedProductById,
  updateDesignedProduct,
  deleteDesignedProduct,
};
