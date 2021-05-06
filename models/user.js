const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not a valid Email', // необязательно, подобная строка прописывается автоматически
    },
  },
  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false, // избавляемся от поля "__v" в схеме
});

module.exports = mongoose.model('user', userSchema);
