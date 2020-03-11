//Login Module	
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
  
	const emailText = loginForm['email'].value;
	const passwordText = loginForm['password'].value;
	if (passwordText.length < 6) {
		alert ('Pleease enter a valid password!');
		return;
	}
	
	auth.signInWithEmailAndPassword(emailText, passwordText).then((cred) => {
		
		loginForm.reset();
		document.querySelector('#loginstatusmessage').innerHTML = 'Login Successfully!';
		window.location = 'index.html'
		
		
	}).catch(err => {
		
		loginForm.reset();
		document.querySelector('#loginstatusmessage').innerHTML = err.message;
		
	});

});

// Listen for click events
loginForm.addEventListener('click', function (event) {

	// If the clicked element isn't our show password checkbox, bail
	if (event.target.id !== 'showpassword') return;

	// Get the password field
	var password = document.querySelector('#password');
	if (!password) return;

	// Check if the password should be shown or hidden
	if (event.target.checked) {
		// Show the password
		password.type = 'text';
	} else {
		// Hide the password
		password.type = 'password';
	}

}, false);
