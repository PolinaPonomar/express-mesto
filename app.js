const express = require('express');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const { otherWaysRouter } = require('./routes/otherWays');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

// парсинг данных
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '60821746c156f33c588fa95e',
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', otherWaysRouter);

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
