const usersRouter = require('express').Router();
const { validationPatchUserProfile } = require('../middlewares/validation');

const { patchUserProfile, getUserAbout } = require('../controllers/users');

// получить свои данные
usersRouter.get('/me', getUserAbout);

// обновить профиль юзера
usersRouter.patch('/me', validationPatchUserProfile, patchUserProfile);

module.exports = usersRouter;
