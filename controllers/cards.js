const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      // кладем в поле owner одноименный объект со всеми характеристиками владельца карточки
      Card.findById(card._id).populate(['owner', 'likes'])
        .then((fullVersionCard) => res.send(fullVersionCard))
        .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findOneAndRemove({ owner: req.user._id, _id: req.params.cardId })
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка удалена' });
      } else {
        Card.findById(req.params.cardId)
          .then((problemCard) => {
            if (problemCard) {
              res.status(405).send({ message: 'У вас нет прав удалить эту карточку' });
            } else {
              res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
            }
          })
          .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const putLike = (req, res) => {
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
        res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: ' Переданы некорректные данные для постановки лайка' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteLike = (req, res) => {
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
        res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: ' Переданы некорректные данные для снятия лайка' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
