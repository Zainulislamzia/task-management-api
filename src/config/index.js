const dotenv = require("dotenv");
dotenv.config();
const { PORT, DEBUG_MODE, MONGODB_URI, JWT_SECRET, JWT_EXPIRATION } =
  process.env;

module.exports = {
  PORT,
  DEBUG_MODE,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
};
