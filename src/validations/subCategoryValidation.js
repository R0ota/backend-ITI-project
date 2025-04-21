const Joi = require("joi");

const createSubCategorySchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  properties: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      property_type: Joi.string().required(),
    }).required()
  ),
});

const updateSubCategorySchema = Joi.object({
  title: Joi.string(),
  category: Joi.string(),
  properties: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      property_type: Joi.string(),
    })
  ),
});

module.exports = {
  createSubCategorySchema,
  updateSubCategorySchema,
};
