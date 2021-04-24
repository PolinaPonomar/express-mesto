const express = require('express');
const { returnError } = require('../controllers/otherWays');

const otherWaysRouter = express.Router();

otherWaysRouter.all('/', returnError); // all - метод, включающий все методы запросов (get, put и т.д.)

module.exports = { otherWaysRouter };
