const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  cookieID: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now } //expires property?
})

const SessionModel = mongoose.model('session', sessionSchema);

module.exports = SessionModel;