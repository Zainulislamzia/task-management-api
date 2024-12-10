const mongoSanitize = require("../middleware/sanitizer");

module.exports = function (app) {
  app.use(mongoSanitize);
  app.use("/api", require("./authRoutes"));
  app.use("/api", require("./taskRoutes"));
};
