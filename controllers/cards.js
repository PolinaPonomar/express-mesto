const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      // кладем в поле owner одноименный объект со всеми характеристиками владельца карточки
      Card.findById(card._id).populate(['owner', 'likes'])
        .then((fullVersionCard) => res.send(fullVersionCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки');
      }
      throw err;
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findOneAndRemove({ owner: req.user._id, _id: req.params.cardId })
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка удалена' });
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректный _id карточки');
      }
      throw err;
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка по указанному _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные для постановки лайка');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Некорректный _id карточки');
      }
      throw err;
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка по указанному _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные для снятия лайка');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Некорректный _id карточки');
      }
      throw err;
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
