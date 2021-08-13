const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    day: { type: Number, required: true },
    seat: { type: Number, required: true },
    client: { type: String, required: true },
    email: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Seats', seatsSchema);