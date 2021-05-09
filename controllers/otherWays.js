const NotFoundError = require('../errors/not-found-err');

const returnError = (req, res, next) => {
  const err = new NotFoundError('Ресурс не найден');
  next(err);
};

module.exports = { returnError };
