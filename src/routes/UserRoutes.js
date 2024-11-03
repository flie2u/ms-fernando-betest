const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/users', userController.createUser); 
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/account/:accountNumber', userController.getUserByAccountNumber);
router.get('/users/identity/:identityNumber', userController.getUserByIdentityNumber);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
