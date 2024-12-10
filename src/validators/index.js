const CustomErrorHandler = require("../utils/customErrorHandler");

const validateRequest = (schema, location) => (req, res, next) => {
  let dataToValidate;
  switch (location) {
    case "body":
      dataToValidate = req.body;
      break;
    case "params":
      dataToValidate = req.params;
      break;
    case "query":
      dataToValidate = req.query;
      break;
    default:
      return next(CustomErrorHandler.badRequest());
  }

  const { error } = schema.validate(dataToValidate);
  if (error) {
    return next(CustomErrorHandler.validationError(error.details[0].message));
  }
  next();
};

module.exports = validateRequest;
