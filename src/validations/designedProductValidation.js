const Joi = require("joi");

const createDesignedProductSchema = Joi.object({
  productId: Joi.string().required(),
  designId: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  quantity: Joi.number().optional(),
  properties: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        property_type: Joi.string().required(),
        property_value: Joi.array().items(Joi.string()).required(),
      })
    )
    .optional(),
});

const updateDesignedProductSchema = Joi.object({
  price: Joi.number().optional(),
  image: Joi.string().optional(),
  quantity: Joi.number().optional(),
  properties: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        property_type: Joi.string().required(),
        property_value: Joi.array().items(Joi.string()).required(),
      })
    )
    .optional(),
});

module.exports = {
  createDesignedProductSchema,
  updateDesignedProductSchema,
};
