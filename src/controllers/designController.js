const DesignCategory = require("../models/designCategoryModel");
const DesignedProduct = require("../models/designedProductModel");
const Design = require("../models/designModel");
const AppError = require("../utils/appError");

const createDesign = async (req, res, next) => {
  try {
    const {products, ...rest} = req.body;
    const category = DesignCategory.findById(req.body.category);
    if (!category) throw new AppError("Category not found", 404);
    const newDesign = await Design.create(req.body);
    if (products && products.length > 0) {
      const designedProducts = products.map((product) => ({
        ...product,
        design: newDesign._id,
      }));
      await DesignedProduct.insertMany(designedProducts);
    }
    res.status(201).json({
      message: "Design created successfully",
      data: newDesign,
    });
  } catch (error) {
    next(error);
  }
};

const getDesigns = async (req, res, next) => {
  try {
    const designs = await Design.find({ isDeleted: false });
    res.status(200).json({
      message: "Designs retrieved successfully",
      data: designs,
    });
  } catch (error) {
    next(error);
  }
};

const getDesignById = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) throw new AppError("Design not found", 404);
    res.status(200).json({
      message: "Design retrieved successfully",
      data: design,
    });
  } catch (error) {
    next(error);
  }
};

const updateDesign = async (req, res, next) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDesign) throw new AppError("Design not found", 404);
    res.status(200).json({
      message: "Design updated successfully",
      data: updatedDesign,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDesign = async (req, res, next) => {
  try {
    const deletedDesign = await Design.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    if (!deletedDesign) throw new AppError("Design not found", 404);
    res.status(200).json({
      message: "Design deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDesign,
  getDesigns,
  getDesignById,
  updateDesign,
  deleteDesign,
};
