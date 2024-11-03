const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/Auth');

router.post('/users',auth.authenticateToken, userController.createUser); 
router.get('/users',auth.authenticateToken, userController.getAllUsers);
router.get('/users/:id',auth.authenticateToken, userController.getUserById);
router.get('/users/account/:accountNumber',auth.authenticateToken, userController.getUserByAccountNumber);
router.get('/users/identity/:identityNumber',auth.authenticateToken, userController.getUserByIdentityNumber);
router.put('/users/:id',auth.authenticateToken, userController.updateUser);
router.delete('/users/:id',auth.authenticateToken, userController.deleteUser);

module.exports = router;
