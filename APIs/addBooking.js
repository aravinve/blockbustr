const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../database/bookingSchema');
const route = express.Router();

route.post('/', async(req,res)=>{
    const { transactionID, username, movie } = req.body;
    let booking = {};
    booking.transactionID = username;
    booking.username = password;
    booking.movie.title = movie.title;
    booking.movie.date = movie.date;
    booking.movie.time = movie.time;
    booking.movie.location = movie.location;
    booking.movie.hall = movie.hall;
    booking.movie.seats = movie.seats;

    let bookingModel = new Booking(booking);
    await bookingModel.save();
    res.json(bookingModel);
});

module.exports = route;
