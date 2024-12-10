const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
});

module.exports = {
  taskSchema,
};
