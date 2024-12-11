const mongoSanitize = require("../middleware/sanitizer");

module.exports = function (app) {
  app.use(mongoSanitize);
  app.use("/api/v1", require("./authRoutes"));
  app.use("/api/v1", require("./taskRoutes"));
};
