const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../database/accountSchema');
const Comment = require('../database/commentlogSchema');
const route = express.Router();

route.post('/scancomments', async (req, res) => {
  

  var verifiedCommentArray = [];
  var potentialxssCommentArray = [];
  var postedcomments = await Comment.find({});
  
  //Database scannning
  postedcomments.forEach(async function(doc){
		
		//first level
		if (doc.comment.match(/<.+?>/ig)){
			
			//second level
			if 	(doc.comment.match(/script/ig) || doc.comment.match(/img/ig)){
				
				if(doc.comment.match(/onerror/ig)){
					
					let update = await Comment.updateOne({comment:doc.comment},{$set: {comment:doc.comment.replace(/onerror/ig,"o n e r r o r")}});
					potentialxssCommentArray.push(doc);
					
				}				
				
				
				//third level
				if(doc.comment.match(/;/ig)){
					
					let update = await Comment.updateOne({comment:doc.comment},{$set: {comment:doc.comment.replace(/;/ig,"_;'")}});
					potentialxssCommentArray.push(doc);
					
				}
											
				
			}else if(doc.comment.match(/alert/ig)){
				
				if(doc.comment.match(/;/ig)){
					let update = await Comment.updateOne({comment:doc.comment},{$set: {comment:doc.comment.replace(/alert/ig,"a l e r t ")}});
				
					// potential XSS code 
					potentialxssCommentArray.push(doc);
				}
			
			}else{verifiedCommentArray.push(doc);}
		
		}
		
		else{
						
			verifiedCommentArray.push(doc);			
					
		}
	    
  });
	
	// If there is no more suspicious XSS code, return true  
	if (!potentialxssCommentArray.length) {
		
		res.json({success: true, message:"No More Suspicious Comment!"});
	  
	} else {
		  
		res.json({	
	
		success: false
		

		});
	}
	
});

module.exports = route;
