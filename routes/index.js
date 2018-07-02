const router = require('express').Router();
const index  = require('../controllers/index_controller')

//route login
router.post('/login', index.loginUser);

//route register
router.post('/register', index.registerUser);

//route FB Login
router.post('/loginfb', index.loginFB);

module.exports = router
