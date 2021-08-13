const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Testimonials', testimonialsSchema);