const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  customerName: { type: String, required: true },
  seats: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);