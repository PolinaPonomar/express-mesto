require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const { otherWaysRouter } = require('./routes/otherWays');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

// парсинг данных
app.use(express.json());
// парсинг куки
app.use(cookieParser());

app.use((req, res, next) => {
  req.user = {
    _id: '60821746c156f33c588fa95e',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
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
