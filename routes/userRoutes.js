const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', userController.uploadImage, userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.uploadImage, userController.updateUser);
router.delete('/profile', auth, userController.deleteUser);

// Admin routes (optional)
router.get('/all', auth, userController.getAllUsers);

module.exports = router;