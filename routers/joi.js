const Joi = require('joi');

module.exports = {
  Joi,
  signUpSchema: Joi.object({
    userId: Joi.string()
      .required()
      .min(3)
      .max(10)
      .pattern(/^[a-z0-9]{3,10}$/),
    nickname: Joi.string()
      .required()
      .min(3)
      .max(10)
      .pattern(/^[a-z0-9]{3,10}$/),
    password: Joi.string()
      .required()
      .min(4)
      .max(10)
      .pattern(/^[a-z0-9]{4,10}$/),
    confirmPassword: Joi.ref('password'),
  }),
  postLoginSchema: Joi.object({
    userId: Joi.string()
      .required()
      .min(3)
      .max(10)
      .pattern(/^[a-z0-9]{3,10}$/),
      password: Joi.string()
      .required()
      .min(4)
      .max(10)
      .pattern(/^[a-z0-9]{4,10}$/),
  }),
  idCheckSchema: Joi.object({
    userId: Joi.string()
      .required()
      .min(3)
      .max(10)
      .pattern(/^[a-z0-9]{3,10}$/),
  }),
  nicknameSchema: Joi.object({
    nickname: Joi.string()
      .required()
      .min(3)
      .max(10)
      .pattern(/^[a-z0-9]{3,10}$/),
  }),
};
