const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, minLength: 1 },
  text: { type: String, required: true, minLength: 1 },
  timeStamp: { type: Date, required: true },
});

module.exports = mongoose.model('message', MessageSchema);
