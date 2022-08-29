const usersRouter = require('express').Router();
const { validationPatchUserProfile } = require('../middlewares/validation');

const { patchUserProfile, getUserAbout } = require('../controllers/users');

// получить свои данные
usersRouter.get('/users/me', getUserAbout);

// обновить профиль юзера
usersRouter.patch('/users/me', validationPatchUserProfile, patchUserProfile);

module.exports = usersRouter;
