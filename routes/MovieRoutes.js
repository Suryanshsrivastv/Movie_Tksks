const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.js');

router.post('/', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/search/:title', async (req, res) => {
    const title = req.params.title;
    try {
      const movies = await Movie.find({
        title: { $regex: title, $options: 'i' }
      });
  
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put('/:id', async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
      res.json(updatedMovie);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
      res.json({ message: 'Movie deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


module.exports = router;
