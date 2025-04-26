const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModel.js');
const Movie = require('../models/Movie.js');


router.post('/payment/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      const isPaymentSuccessful = Math.random() > 0.5;
  
      if (isPaymentSuccessful) {
        booking.paymentStatus = 'Completed';
        await booking.save();
        res.json({ message: 'Payment confirmed, booking completed' });
      } else {
        res.status(400).json({ error: 'Payment failed. Please try again.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    const { movie, customerName, seats } = req.body;
    try {
      const movieDoc = await Movie.findById(movie);
      if (!movieDoc) return res.status(404).json({ error: 'Movie not found' });
  
      if (movieDoc.totalSeats < seats) {
        return res.status(400).json({ error: 'Not enough seats available' });
      }

      const booking = new Booking({ movie, customerName, seats });
      const savedBooking = await booking.save();
  
      movieDoc.totalSeats -= seats;
      await movieDoc.save();
  
      res.status(201).json(savedBooking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
  
      const movieDoc = await Movie.findById(booking.movie);
      if (movieDoc) {
        movieDoc.totalSeats += booking.seats;
        await movieDoc.save();
      }
  
      await booking.deleteOne();
  
      res.json({ message: 'Booking cancelled and seats refunded' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('movie', 'title');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

module.exports = router;