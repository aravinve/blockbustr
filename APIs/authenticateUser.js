const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const Comment = require('../database/commentlogSchema');
const route = express.Router();

route.post('/', async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  const user = await Account.findOne({ username });
  
  //Database scanning for invalid pattern
  var cursor = await Account.find(
  {$or: 
  
  [
 
  {'username': { $in: [ /script/i, /alert/i, /javascript/i] } },
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
  //Database scannning ended here 
  
  if ((username === user.username) & (password === user.password)) {
    jwt.sign({ user }, 'secretkey', (err, token) => {
      res.json({ user: user, success: true, token: token });
    });
  } else {
    res.json({ success: false });
  }
});

route.post('/post', verifyToken, async (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post Created',
        authData
      });
    }
  });
});

route.post('/postcomment', verifyToken, async (req, res) => {
	
  comment = req.body.comment;
  username = req.body.username;
  
  let posted_comment = {};
  posted_comment.username = username;
  posted_comment.comment = comment;

  let commentModel = new Comment(posted_comment);
  await commentModel.save();
  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: comment,
		success: true,
        authData
      });
    }
  });
});

route.post('/getcomments', async (req, res) => {
	
  var commentarray = [];
  var postedcomments = await Comment.find({});
  
  
  //Database scannning
  postedcomments.forEach(function(doc){
		
		if (doc.comment.match(/<.+?>/ig)){
			
			if 	(doc.comment.match(/script/ig)){
				
				
			}else if(doc.comment.match(/alert/ig)){
			
			
			}else{commentarray.push(doc);}
		
		}
		
		else{
			
			commentarray.push(doc);			
					
		}
	    
  });
	
	jwt.verify(req.token, 'secretkey', (err, authData) => {
	  
	  if ((!commentarray)) {
		
		res.json({success: false, message:"Oh, no"});
	  
	  } else {
		  
		  res.json({
			comments: commentarray,
			success: true,
			authData
		  });
	  }
	});
});

route.get('/getcredits', verifyToken, async (req, res) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const name = req.query.name
      const credits = req.query.credits

      res.json({
        credits:credits ,
        name:name
      });
    }
  });
});
function verifyToken(req, res, next) {
  const clientHeader = req.headers['authorization'];
  if (typeof clientHeader != 'undefined') {
    const clientHeaderArray = clientHeader.split(' ');
    const authToken = clientHeaderArray[1];
    req.token = authToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = route;
