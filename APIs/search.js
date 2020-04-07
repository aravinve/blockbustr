const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../database/bookingSchema');
const route = express.Router();

route.get('/', async (req, res) => {
  res.json({ success: true, q: req.query.q });
});

module.exports = route;
