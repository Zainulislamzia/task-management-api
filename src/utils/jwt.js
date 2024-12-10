const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION, JWT_SECRET } = require("../config");

class JwtService {
  static sign(payLoad, expiry = JWT_EXPIRATION, secret = JWT_SECRET) {
    return jwt.sign(payLoad, secret, { expiresIn: expiry });
  }

  static verify(token, secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
