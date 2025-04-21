const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
