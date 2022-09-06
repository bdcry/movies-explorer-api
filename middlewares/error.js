// error
const INTERNAL_SERVER_ERROR = require('../utils/errors/InternalServerError');

// error message
const { messagesError } = require('../utils/const');

module.exports = (err, _, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message:
        statusCode === INTERNAL_SERVER_ERROR
          ? messagesError.serverError
          : message,
    });
  next();
};
