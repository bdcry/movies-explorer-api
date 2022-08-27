const usersRouter = require('express').Router();
const { validationPatchUserProfile } = require('../middlewares/validation');

const { patchUserProfile, getUserAbout } = require('../controllers/users');

// Получить свои данные
usersRouter.get('/me', getUserAbout);

// Обновить профиль Юзера
usersRouter.patch('/me', validationPatchUserProfile, patchUserProfile);

module.exports = usersRouter;
