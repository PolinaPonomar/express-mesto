const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const JWT_SECRET = '071d5a0c28a4e7b50bb9712284f25c7fcf31c62680c024094011c56d70586c4e';

module.exports = (req, res, next) => {
  // eslint-disable-next-line max-len
  if (!req.cookies.jwt) { // поверяем, есть ли в заголовке cookie jwt-токен (тут уже распарсенное значение)
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
  return null;
};
