const mongoose   = require('mongoose');
const Schema     = mongoose.Schema
const todoSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  todo: String,
  status: String
}, {
  timestamps: true
})

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;