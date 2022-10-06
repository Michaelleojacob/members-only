const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
  username: { type: String, required: true, minLength: 1 },
  password: { type: String, required: true, minLength: 6 },
});

module.exports = mongoose.model('users', users);
