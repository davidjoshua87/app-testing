const router = require('express').Router();
const user   = require('../controllers/user_controller');

// show user
router.get('/show-user', user.getUser);

// update-user
router.put('/update-user', user.updateUser);

// change-password
router.put('/change-password', user.changePassword);

module.exports = router;