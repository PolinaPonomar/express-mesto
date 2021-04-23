const express = require('express');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('hello!:)');
// });

// app.post('/', (req, res) => {
//   res.send(req.body);
// });

app.use('/users', usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '60821746c156f33c588fa95e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/cards', cardsRouter);

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
