const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    action: String,
    message: String,
    date: { type: Date, default: Date.now },
  },
  {
    collection: 'log',
    versionKey: false,
  },
);

module.exports = mongoose.model('Log', logSchema);
