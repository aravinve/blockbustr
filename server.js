const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hpp = require('./middleware/hpp-middleware');

// Create App
const app = express();
// Connect Middleware
app.use(bodyParser.json());
app.use(hpp);
// Create Database Connection
const db = require('./config/keys').mongoURI;
// Establish Database Connection
mongoose
  .connect(db)
  .then(() => {
    console.log('Mongo Cluster Connected Successfully');
  })
  .catch((err) => {
    console.log(err);
  });
// PORT
const port = process.env.PORT || 5000;
// Listen Application
app.listen(port, () => console.log(`Server started successfully at ${port}`));

//API for adding account
app.use('/API/addBooking', require('./APIs/bookingRoute'));
app.use('/API/addAccount', require('./APIs/accountRoute'));
app.use('/API/validateUser', require('./APIs/authenticateUser'));
app.use('/API/forgotPassword', require('./APIs/forgotPassword'));
app.use('/API/resetPassword', require('./APIs/resetPassword'));
app.use('/API/validateOTP', require('./APIs/OTPValidation'));
app.use('/API/search', require('./APIs/search'));
