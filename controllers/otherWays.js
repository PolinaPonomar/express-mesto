const returnError = (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден' });
};

module.exports = { returnError };
