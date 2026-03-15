const express = require('express');
const router = express.Router();
const {register, login, getUsers, deleteUser} = require('../controllers/UserController')

router.post('/register', register);
router.post('/login', login);
router.get('/all-users', getUsers);
router.delete('/delete-user', deleteUser);


module.exports = router;