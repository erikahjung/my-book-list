const express = require('express');
const userController = require('../Controllers/userController');

const UserRouter = express.Router();

//POST request to get a user - we can't send a req.body in a GET request
UserRouter.post('/login', userController.getUser, (req, res) => {
  return res.status(200).json({ id: res.locals.id });
});

//POST request to create a new user
UserRouter.post('/', userController.createUser, (req, res) => {
  return res.status(200).json({ id: res.locals.id });
})

//DELETE request to delete an existing user
UserRouter.delete('/:id', userController.deleteUser, (req, res) => {
  return res.status(200).json({ id: res.locals.id });
})

//UPDATE request to update an existing user

module.exports = UserRouter;