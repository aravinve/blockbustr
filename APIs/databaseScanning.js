const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const Comment = require('../database/commentlogSchema');
const nodemailer = require('nodemailer');
const route = express.Router();

route.post('/scancomments', async (req, res) => {
  
  var suspiciousDoc = "";
  var sanitizedDoc = ""; 
  var riskScore = 0;
  var finalRiskScore = 0;
  var verifiedCommentArray = [];
  var potentialxssCommentArray = [];
  var postedcomments = await Comment.find({});
  
  //Database scannning
  postedcomments.forEach(async function(doc){
		
		riskScore = 0;
		suspiciousDoc = doc.comment;
		sanitizedDoc = suspiciousDoc;
		
		//first level
		if (suspiciousDoc.match(/(<.+?>)/ig) || suspiciousDoc.match(/script/ig) || suspiciousDoc.match(/javascript/ig) || suspiciousDoc.match(/;/ig)){
						
			riskScore += 1;
			finalRiskScore = riskScore;
			
			//second level
			if (suspiciousDoc.match(/;/ig) || suspiciousDoc.match(/([on]\w+\s*[=]\s*\w+)/ig) ){

				riskScore += 1;
				sanitizedDoc = sanitizedDoc.replace(/;/ig,"&sc");			
		
				let update = await Comment.updateOne({_id:doc.id},{$set: {comment:sanitizedDoc}});
				finalRiskScore = riskScore;
							
				//third level
				if(suspiciousDoc.match(/img/ig) || suspiciousDoc.match(/escape/ig) || suspiciousDoc.match(/alert/ig)){
					
					riskScore += 1;
					sanitizedDoc = sanitizedDoc.replace(/</ig,"&lt");
					sanitizedDoc = sanitizedDoc.replace(/>/ig,"&gt");
					let update = await Comment.updateOne({_id:doc.id},{$set: {comment:sanitizedDoc}});
					potentialxssCommentArray.push(doc);
															
					//Reset the risk score
					finalRiskScore = riskScore;
						
						// Alert server owner 
						if(finalRiskScore == 3){
							
							var transporter = nodemailer.createTransport({
							  service: 'gmail',
							  auth: {
								user: 'blockbustrgang@gmail.com',
								pass: 'wolfgang@01'
							  }
							});

							var mailOptions = {
							  from: 'blockbustrgang@gmail.com',
							  to: 'blockbustrgang@gmail.com',
							  subject: '[IMPORTANT] Blockbustr\'s Database Scanning Results',
							  text: 'We found that one of the comments' + '(id: ' + doc._id + ')' + ' posted by the account: ' + doc.username + ' contains suspicious code that could lead to XSS attack. Please review the following comment: ' + doc.comment + ' .'
							};

							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
								console.log(error);
							  } else {
								console.log('Email sent: ' + info.response);
							  }
							});	
												
						}
						//end of the alert module
						
				}else{verifiedCommentArray.push(doc);}				
				

			}else{verifiedCommentArray.push(doc);}
		
		}else{
						
			verifiedCommentArray.push(doc);			
					
		}
	    
  });
	
	// If there is no more suspicious XSS code, return true  
	if (!potentialxssCommentArray.length) {
		
		res.json({success: true});
	  
	} else {
		  
		res.json({	
	
		success: false,
		message: finalRiskScore

		});
	}
	
});

module.exports = route;
