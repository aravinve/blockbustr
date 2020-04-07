const express = require('express');
const mongoose = require('mongoose');
const Account = require('../database/accountSchema');
const route = express.Router();

function sanitize(userInput){

	let inputVal = userInput;
	const re3 = /<.+?>/g
	const re4 = /<[a-zA-Z]+[a-zA-Z0-9]*((\s+([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^ >]*)))+).*>/gim
	
	let result = inputVal.match(re4);
	//alert(result);
	let txt = inputVal.replace(/<.+?>/g,"[Removed]");
	let txt1 = txt.replace(/alert/g,"[Removed]");
	return txt1;

}

route.get('/', async (req, res) => {
  username = req.query.username.toString();
  password = req.query.password.toString();
  
  sanitized_password = sanitize(password); 
  
  const user = await Account.findOne({ username });
  if (username === user.username & sanitized_password === password) {
    const result = await Account.update(
      { username },
      {
        $set: {
          password: password,
        },
      }
    );
	
	res.json({ 
		success: true 
	});
	
  } else {

	res.json({ 		
		message: "Potential XSS detected, please re-enter your new password!",
		success: false 
	});
 
  
  }
});

module.exports = route;
