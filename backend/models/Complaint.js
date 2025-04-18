const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'resolved', 'in-progress'], default: 'pending' },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
 
