const DesignCategory = require('../models/designCategoryModel');
const AppError = require('../utils/appError');

const createDesignCategory = async (req, res, next) => {
    try {
        if(req.file) {
            req.body.image = req.file.path;
        }
        const designcategory = await DesignCategory.create(req.body);
        res.status(201).json({
            message: 'DesignCategory created successfully',
            data: designcategory,
        });
    } catch (error) {
        next(error)
    }
}

const getAllDesignCategories = async (req, res, next) => {
    try {
        const designCategories = await DesignCategory.find({
            isDeleted: false,
        });
        res.status(200).json({
            message: 'Design Categories retrieved successfully',
            data: designCategories,
        });
    } catch (error) {
        next(error)
    }
}

const getDesignCategoryById = async (req, res, next) => {
    try {
        const designCategory = await DesignCategory.findById(req.params.id);
        if (!designCategory) {
            throw new AppError('Design Category not found', 404);
        }
        res.status(200).json({
            message: 'Design Category retrieved successfully',
            data: designCategory,
        });
    } catch (error) {
        next(error)
    }
}

const updateDesignCategory = async (req, res, next) => {
    try {
        const designcategory = await DesignCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!designcategory) {
            throw new AppError('Design Category not found', 404);
        }
        res.status(200).json({
            message: 'Design Category updated successfully',
            data: designcategory,
        });
    } catch (error) {
        next(error)
    }
}

const deleteDesignCategory = async (req, res, next) => {
    try {
        const designcategory = await DesignCategory.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
        });
        if (!designcategory) {
            throw new AppError('Design Category not found', 404);
        }
        res.status(200).json({
            message: 'Design Category deleted successfully',
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createDesignCategory,
    getAllDesignCategories,
    getDesignCategoryById,
    updateDesignCategory,
    deleteDesignCategory,
}