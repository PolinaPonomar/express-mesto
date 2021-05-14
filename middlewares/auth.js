const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const JWT_SECRET = 'dev-secret';

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
