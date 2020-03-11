// Sign-up Module 
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
	e.preventDefault();
  
	// get user info
	const nameText = signupForm['name'].value;
	const emailText = signupForm['email'].value;
	const passwordText = signupForm['password1'].value;
	const passwordText2 = signupForm['password2'].value;
	const firstNameText = signupForm['lastname'].value;

	auth.createUserWithEmailAndPassword(emailText,passwordText2).then(cred => {

	// Add a new document in collection " user accounts "
	return db.collection("users").doc("rhoT6YWthj07DmyIyifY").set({
		username: signupForm.email.value,password: signupForm.password1.value
	})
	.then(function(){
		console.log("Document successfully written!");
		signupForm.reset();
	})
	.catch(function(){
	
		console.error("Error writing document: ", error);
	})

	  
    }).catch(function(error){
	
		var errorCode = error.code;
		var errorMessage = error.message;
	
		window.alert("Error : " + errorMessage);
	
	});
 

	});

