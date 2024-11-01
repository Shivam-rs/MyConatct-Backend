const { constants } = require("constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
      break;

    case constants.UNAUTHORIZED:
      res.json({ title: "Unautherized access", message: err.message, stackTrace: err.stack });
      break;

    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
      break;

    case constants.NOT_FOUND:
      res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;

    case constants.SERVER_ERROR:
      res.json({ title: "Server not found", message: err.message, stackTrace: err.stack });
      break;

    default:
      console.log("All good here!!");
      break;
  }

};

module.exports = errorHandler;
