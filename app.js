const express = require('express');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('hello!:)');
// });

// app.post('/', (req, res) => {
//   res.send(req.body);
// });

app.use('/users', userRoutes);

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
