const Joi = require("joi");

const createDesignCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const updateDesignCategorySchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = {
  createDesignCategorySchema,
  updateDesignCategorySchema,
};
