const signUpBtn = document.getElementById("submit_button");
const url = "http://34.135.190.211/"

signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        var email = document.getElementById("email");
	var username = document.getElementById("username");
        var pw = document.getElementById("pw");

	let AJAX = new XMLHttpRequest();
	
	AJAX.onerror = function(e) {
		alert("Error." + e)
	}

	AJAX.onload = function() {
		if (this.status == 200) {
			console.log(this.responseText);
			if(this.responseText == "Input field(s) are empty"){
				emptyFields(this.responseText);
			}
			else if(this.responseText == "Email already registered."){
				duplicateEmails(this.responseText);
			}
			else{
				const pwDiv = document.getElementById("pwDiv");
				const emptyField = document.getElementById('emptyField');
				const dupeEmail = document.getElementById('dupeEmail');

				if(emptyField){
					emptyField.remove();
				}
				else if (dupeEmail){
					dupeEmail.remove();
				}
				
				const successfulRegistration = document.createElement('div');
				successfulRegistration.id = 'success';
				successfulRegistration.className = "flex items-center justify-center mt-2";
				successfulRegistration.innerHTML = `<p class="text-green-500 font-bold"> ${this.responseText} </p>`;
				const loginNow = document.createElement('div');
				loginNow.id = 'loginNow';
				loginNow.className = "flex items-center justify-center mt-2";
				loginNow.innerHTML = `<p class="text-green-500 font-bold"> Login Now </p>`;
				pwDiv.after(successfulRegistration);
				successfulRegistration.after(loginNow);
			}
		}
		else{
			alert(this.status);
			console.log("error");
	}}
	AJAX.open("GET", "signup?email="+email.value+"&username="+username.value+"&password="+pw.value);
	console.log("GET", "signup?email="+email.value+"&username="+username.value+"&password="+pw.value);
	AJAX.send();
});

function emptyFields(responseText) {
	const pwDiv = document.getElementById("pwDiv");
	const emptyField = document.getElementById('emptyField');
	const dupeEmail = document.getElementById('dupeEmail');

	if(emptyField){
		emptyField.remove()
	}
	else if (dupeEmail) {
		dupeEmail.remove();
	}

	const emptyFieldDiv = document.createElement('div');
	emptyFieldDiv.id = 'emptyField';
	emptyFieldDiv.className = "flex items-center justify-center mt-2";
	emptyFieldDiv.innerHTML = `<p class="text-red-800 font-bold"> ${responseText} </p>`;

	pwDiv.after(emptyFieldDiv);
};

function duplicateEmails(responseText){
	const pwDiv = document.getElementById("pwDiv");
	const emailDiv = document.getElementById("dupeEmail");
	const emptyField = document.getElementById('emptyField');

	if (emailDiv) {
		emailDiv.remove()
	}
	else if (emptyField){
		emptyField.remove();
	}

	const dupeEmail = document.createElement('div');
	dupeEmail.id = 'dupeEmail';
	dupeEmail.className = "flex items-center justify-center mt-2";
	dupeEmail.innerHTML = `<p class="text-red-800 font-bold"> ${responseText} </p>`;

	pwDiv.after(dupeEmail);
};
