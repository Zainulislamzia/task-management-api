const sanitize = require("mongo-sanitize");

const mongoSanitize = (req, res, next) => {
  req.body = sanitize(req.body);

  req.query = sanitize(req.query);

  req.params = sanitize(req.params);

  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);

  next();
};

const sanitizeObject = (obj) => {
  if (obj) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
        if (key === "email") {
          obj[key] = obj[key].toLowerCase().trim();
        }
      }
    }
  }
};
module.exports = mongoSanitize;
