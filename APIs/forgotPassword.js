const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const OTPassword = require('../database/passwordlogSchema');
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
  
  const existingOtpUser = await OTPassword.findOne({ username });
  const user = await Account.findOne({ username });
  
  //remove existing OTP in database 
  //remove existing OTP in database
  if (existingOtpUser) {
	
	await OTPassword.remove({ username });

	}
  
  if (!user){
	  
	  res.json({ success: false });
  
  }else if ( (username === user.username)) {
	  
	  //Database scanning for invalid pattern
	  var cursor = await Account.find(
	  {$or: 
	  
	  [
	  
	  {'username': { $in: [ /script/i, /alert/i, /javascript/i ] } },
	  {'lastName': { $in: [ /script/i, /alert/i, /javascript/i ] } },
	  {'firstName': { $in: [ /script/i, /alert/i, /javascript/i ] } },
	  {'email': { $in: [ /script/i, /alert/i, /javascript/i ] } }
	  
	  ]
	  
	  }, function (err, docs) {
		  
		if (err) return console.log(err);
	  
	  });
	  
	  
	  cursor.forEach(function(suspiciousRecord){
			
			if (username === suspiciousRecord.username){
							
				res.json({ 	
					message: "Please contact IT helpdesk for more information" ,
					violation: true 
				});
						
			}
			
	  });
	  
	//OTP generation
	onetimepassword = OTPgeneration(6);
	
	let otpassword = {};
	otpassword.username = username;
	otpassword.onetimepassword = onetimepassword;

	let otpModel = new OTPassword(otpassword);
	await otpModel.save();
	
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
	
	res.json({ success: true});

  
  } else {
    res.json({ success: false });
  }
});

module.exports = route;
