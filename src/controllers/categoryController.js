const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');

const createCategory = async (req, res, next) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        }
        const category = await Category.create(req.body);
        res.status(201).json({
            message: 'Category created successfully',
            data: category,
        });
    } catch (error) {
        next(error)
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({
            isDeleted: false,
        });
        res.status(200).json({
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error) {
        next(error)
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        res.status(200).json({
            message: 'Category retrieved successfully',
            data: category,
        });
    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        res.status(200).json({
            message: 'Category updated successfully',
            data: category,
        });
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
        });
        if (!category) {
            throw new AppError('Category not found', 404);
        }
        res.status(200).json({
            message: 'Category deleted successfully',
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}