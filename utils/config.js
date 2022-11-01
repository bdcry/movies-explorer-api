const rateLimit = require('express-rate-limit');

const {
  MoviesExplorerdb = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // за 5 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = {
  MoviesExplorerdb, PORT, NODE_ENV, JWT_SECRET, limiter,
};
