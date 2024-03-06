const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;