const express = require('express');
const router = express.Router();
const userController = require('../controllers/join.controllers.js');

// Retrieve all users
router.get('/all', userController.findAllUsers);
// Create a new user
router.post('/post', userController.createUser);
// Retrieve a single user with id
router.get('/:id', userController.findOneUser);
// Update a user with id
router.put('/:id', userController.updateUser);
// Delete a user with id
router.delete('/:id', userController.deleteUser);

module.exports = router;