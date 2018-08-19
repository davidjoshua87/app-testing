const router = require('express').Router()
const todo   = require('../controllers/todo_controller')

// add todo
router.post('/add', todo.addTodo)

// show todo
router.get('/show', todo.showTodo)

// show todo by status
router.get('/show/:status', todo.findByStatus)

// update todo
router.put('/update/:id', todo.updateTodo)

// delete todo
router.delete('/delete/:id', todo.deleteTodo)

// finish todo
router.put('/finish/:id', todo.finishedTodo)

module.exports = router