const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");

const createSubCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) throw new AppError("Category not found", 404);
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({
      message: "SubCategory created successfully",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find({ isDeleted: false });
    res.status(200).json({
      message: "SubCategories fetched successfully",
      data: subCategories,
    });
  } catch (error) {
    next(error);
  }
};

const getOneSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) throw new AppError("SubCategory not found", 404);
    res.status(200).json({
      message: "SubCategory fetched successfully",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subCategory) throw new AppError("SubCategory not found", 404);
    res.status(200).json({
      message: "SubCategory updated successfully",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!subCategory) throw new AppError("SubCategory not found", 404);
    res.status(200).json({
      message: "SubCategory deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getOneSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
