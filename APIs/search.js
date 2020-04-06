const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../database/bookingSchema');
const route = express.Router();

route.get('/', async (req, res) => {
  console.log(req.query.q);
  res.json({ success: true });
});

module.exports = route;
