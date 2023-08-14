const express = require('express');
const userController = require('../Controllers/userController');
const sessionController = require('../Controllers/sessionController');

const UserRouter = express.Router();

// //GET request to see if the user has an active session - browser cookies
// UserRouter.get('/', sessionController.getSession, (req, res) => {
//   return res.status(200).json();
// });

//POST request to get a user - we can't send a req.body in a GET request
UserRouter.post('/login', userController.getUser, sessionController.createSession, (req, res) => {
  return res.status(200).json({ id: res.locals.id });
});

//POST request to create a new user
UserRouter.post('/', userController.createUser, sessionController.createSession, (req, res) => {
  return res.status(200).json({ id: res.locals.id });
})

//POST request to delete a session
UserRouter.post('/logout', sessionController.deleteSession, (req, res) => {
  return res.status(200).json();
})

//DELETE request to delete an existing user
UserRouter.delete('/:id', userController.deleteUser, sessionController.deleteSession, (req, res) => {
  return res.status(200).json({ id: res.locals.id });
})

//UPDATE request to update an existing user

module.exports = UserRouter;