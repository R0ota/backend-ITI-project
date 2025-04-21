const Joi = require('joi');

const createProductShcema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    min_price: Joi.number().min(0).required(),
    max_price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    image: Joi.string().optional(),
})

const updateProductShcema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    min_price: Joi.number().min(0).optional(),
    max_price: Joi.number().min(0).optional(),
    category: Joi.string().optional(),
    image: Joi.string().optional(),
})

module.exports = {
    createProductShcema,
    updateProductShcema
}