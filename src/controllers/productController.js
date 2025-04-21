const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");

// @desc    Get all products with filters, sorting, and pagination
// @route   GET /products
const getProducts = async (req, res, next) => {
  try {
    const { category, price, sort, page = 1, limit = 10 } = req.query;
    let filter = {
      isDeleted: false,
    };

    if (category) filter.category = category;
    if (price) filter.price = { $lte: Number(price) };

    const options = {
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      skip: (page - 1) * limit,
      limit: Number(limit),
    };

    const products = await Product.find(filter)
      .populate("category", "name")
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort);
    res.json({ message: "Products found successfully", data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single product by ID
// @route   GET /products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError("Product not found", 404);

    res.json({ message: "Product found successfully", data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product (Admin Only)
// @route   POST /products
const createProduct = async (req, res, next) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) throw new AppError("Category not found", 404);
    if (req.file) req.body.image = req.file.path;
    const newProduct = await Product.create(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (Admin Only)
// @route   PUT /products/:id
const updateProduct = async (req, res, next) => {
  try {
    if(req.file) req.body.image = req.file.path;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) throw new AppError("Product not found", 404);

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (Admin Only)
// @route   DELETE /products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    if (!deletedProduct) throw new AppError("Product not found", 404);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
