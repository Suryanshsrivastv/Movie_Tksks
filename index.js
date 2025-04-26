const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./db/db.js');

dotenv.config();
app.use(express.json());

connectDB();
const bookingRouter = require('./routes/BookingRoutes.js');
const mooviesRouter = require('./routes/MovieRoutes.js');
app.use('/movies', mooviesRouter);
app.use('/bookings', bookingRouter);

app.listen(process.env.PORT || 3000 ,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
});