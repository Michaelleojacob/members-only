const mongoose = require('mongoose');
const { Schema } = mongoose;

const Messages = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, minLength: 1 },
  text: { type: String, required: true, minLength: 1 },
  timeStamp: { type: Date, required: true },
});

module.exports = mongoose.model('message', Messages);
