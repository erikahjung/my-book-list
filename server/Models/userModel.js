const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

const User = mongoose.Model('user', userSchema);

module.exports = User;