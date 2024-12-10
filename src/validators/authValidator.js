const Joi = require("joi");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(emailRegex)
    .email({ minDomainSegments: 2 })
    .regex()
    .required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .regex(emailRegex)
    .required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
