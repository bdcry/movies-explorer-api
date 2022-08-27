// router
const router = require('express').Router();

// routers
const moviesRouter = require('./movies');
const usersRouter = require('./users');

// controllers
const { login, createUser } = require('../controllers/users');

// auth
const auth = require('../middlewares/auth');

// middlewares
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validation');

// errors
const errorRouter = require('./errors');

router.post('/signin', validationLogin, login);

router.post('/signup', validationCreateUser, createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);
router.all('*', auth, errorRouter);

module.exports = router;
