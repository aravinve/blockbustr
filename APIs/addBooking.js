const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../database/bookingSchema');
const route = express.Router();

route.post('/', async(req,res)=>{
    const { transactionID, username, movie } = req.body;
    let booking = {};
    console.log(movie);
    booking.transactionID = transactionID;
    booking.username = username;
    booking.movie = movie;

    let bookingModel = new Booking(booking);
    await bookingModel.save();
    res.json(bookingModel);
});

module.exports = route;
