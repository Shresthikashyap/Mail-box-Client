const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  isRead:{
    type:Boolean,
    required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;