const Joi = require("joi");

const createDesignShcema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  products: Joi.array()
    .items(
      Joi.object({
        price: Joi.number().required(),
        product: Joi.string().required(),
        image: Joi.string().optional(),
        quantity: Joi.number().optional(),
      }).required()
    )
    .required(),
  category: Joi.string().required(),
  image: Joi.string().optional(),
});

const updateDesignShcema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  // products: Joi.array()
  //   .items(
  //     Joi.object({
  //       price: Joi.number().required(),
  //       product: Joi.string().required(),
  //       image: Joi.string().optional(),
  //     }).required()
  //   )
  //   .optional(),
  category: Joi.string().optional(),
  image: Joi.string().optional(),
});

module.exports = {
  createDesignShcema,
  updateDesignShcema,
};
