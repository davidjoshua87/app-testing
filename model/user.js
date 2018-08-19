const mongoose   = require('mongoose');
const Schema     = mongoose.Schema
const userSchema = mongoose.Schema({
  fbId: String,
  email: {
    type: String,
    unique: true,
    required: [true, 'User email required']
  },
  phone: {
    type: String,
    unique: true,
    min: 10,
    max: 12,
    required: [true, 'User phone number required']
  },
  name: {
    type: String,
    required: [true, 'Name required']
  },
  password: {
    type: String,
    min: 8,
    required: [true, 'Password required']
  }
}, {
  timestamps: true
})
const user = mongoose.model('user', userSchema);

module.exports = user;