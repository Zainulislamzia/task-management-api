const { User } = require("../models");
const JwtService = require("../utils/jwt");
const CustomErrorHandler = require("../utils/customErrorHandler");
const { JWT_SECRET, JWT_EXPIRATION } = require("../config");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return next(CustomErrorHandler.alreadyExist("User already exists"));
    }

    user = new User({ name, email, password });
    await user.save();

    const token = await JwtService.sign(
      { userId: user._id },
      JWT_EXPIRATION,
      JWT_SECRET
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredential("Invalid credentials"));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(CustomErrorHandler.wrongCredential("Invalid credentials"));
    }

    const token = await JwtService.sign(
      { userId: user._id },
      JWT_EXPIRATION,
      JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
