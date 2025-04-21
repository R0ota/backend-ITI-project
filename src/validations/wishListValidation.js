const Joi = require("joi");

const addToWishListSchema = Joi.object({
  designId: Joi.string().required(),
  productId: Joi.string().required(),
});

module.exports = {
  addToWishListSchema,
};
