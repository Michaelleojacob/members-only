const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    unique: 'that username is already taken',
  },
  password: { type: String, required: true, minLength: 6 },
});

module.exports = mongoose.model('user', User);
