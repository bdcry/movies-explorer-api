const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');

// error
const AuthorizationError = require('../utils/errors/AuthorizationError');

// erorr messages
const { messagesError } = require('../utils/const');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовк
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError(messagesError.authorization));
  }
  const token = authorization.replace('Bearer ', ''); // извлекаем токен
  let payload;
  try {
    // пытаемся верифицировать токен
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
    );
  } catch (err) {
    next(new AuthorizationError(messagesError.authorization));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
