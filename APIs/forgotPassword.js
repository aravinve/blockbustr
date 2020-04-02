const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const route = express.Router();
const nodemailer = require('nodemailer');

function OTPgeneration(length) {
   var generatedOTP     = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      generatedOTP += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return generatedOTP;
}

route.post('/', async (req, res) => {
  username = req.body.username;
  const user = await Account.findOne({ username });
  
  if ((username === user.username)) {
	//OTP generation
	onetimepassword = OTPgeneration(6);
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'blockbustrgang@gmail.com',
		pass: 'wolfgang@01'
	  }
	});

	var mailOptions = {
	  from: 'blockbustrgang@gmail.com',
	  to: username,
	  subject: 'Blockbustr\'s Password Reset',
	  text: 'We have received a request to reset your password for your Blockbustr account! Your OTP is ' + onetimepassword
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
	
	const result = await Account.update({ username }, {
		$set: {
			password: onetimepassword
		}
	});
	
	res.json({ success: true });
  
  } else {
    res.status(401).send('Account not found.');
  }
});

module.exports = route;
