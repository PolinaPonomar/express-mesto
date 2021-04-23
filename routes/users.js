const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', createUser);

module.exports = { userRoutes };
