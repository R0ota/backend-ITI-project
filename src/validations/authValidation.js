const Joi = require("joi");

const checkOldPasswordShcema = Joi.object({
  oldPassword: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

module.exports = {
  checkOldPasswordShcema,
  changePasswordSchema,
};