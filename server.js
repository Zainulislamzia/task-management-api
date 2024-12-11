require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");
const errorHandler = require("./src/middleware/errorHandler");
const { PORT } = require("./src/config");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

require("./src/routes/index")(app);

app.use(errorHandler);

if (require.main === module) {
  const port = PORT || 5000;
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}
module.exports = app;
