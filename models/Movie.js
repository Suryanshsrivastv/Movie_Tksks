const mongoose = require('mongoose');

const moveiSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    duration: { type: Number, required: true },
    release: Date,
    totalSeats: { type: Number, required: true } 
});


module.exports = mongoose.model('Movie', moveiSchema);
