require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");
const routes = require("./src/routes/index");
const errorHandler = require("./src/middleware/errorHandler");
const { PORT } = require("./src/config");

const app = express();

connectDB();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

const port = PORT || 5000;
app.listen(port, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
