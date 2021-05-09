const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getCurrentUser, getUserById, updateUserInfo, updateAvatar,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

module.exports = { usersRouter };
