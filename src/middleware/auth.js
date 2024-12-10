const JwtService = require("../utils/jwt");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");
const CustomErrorHandler = require("../utils/customErrorHandler");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = await JwtService.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized("Please authenticate first"));
  }
};

module.exports = authMiddleware;
