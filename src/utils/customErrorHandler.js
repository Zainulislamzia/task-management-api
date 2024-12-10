class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message = "Resource already exists") {
    return new CustomErrorHandler(409, message);
  }

  static notAuthorized(message = "Not authorized to perform this action") {
    return new CustomErrorHandler(403, message);
  }

  static badRequest(message = "Bad request") {
    return new CustomErrorHandler(400, message);
  }

  static wrongCredential(message = "Unauthorized access") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "Unauthorized to perform this action") {
    return new CustomErrorHandler(401, message);
  }

  static serverError(message = "Internal Server Error") {
    return new CustomErrorHandler(500, message);
  }

  static notFound(message = "Resource not found") {
    return new CustomErrorHandler(404, message);
  }

  static validationError(message = "Invalid Request") {
    return new CustomErrorHandler(400, message);
  }

  static forbidden(message = "Forbidden Request") {
    return new CustomErrorHandler(403, message);
  }
}

module.exports = CustomErrorHandler;
