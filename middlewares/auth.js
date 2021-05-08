const jwt = require('jsonwebtoken');

const JWT_SECRET = '071d5a0c28a4e7b50bb9712284f25c7fcf31c62680c024094011c56d70586c4e';

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return res.status(401).send({ message: 'Необходима авторизация' });
  // }
  // const token = authorization.replace('Bearer ', '');

  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
  return null;
};
