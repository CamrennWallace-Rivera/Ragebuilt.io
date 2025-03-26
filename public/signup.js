const signUpBtn = document.getElementById("submit_button");
const url = "http://34.135.190.211/"

signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        var email = document.getElementById("email");
	var username = document.getElementById("username");
        var pw = document.getElementById("pw");
        console.log("Email: " + email);
	console.log("Username: " + username);
        console.log("Password: " + pw);

	let AJAX = new XMLHttpRequest();
	
	AJAX.onerror = function(e) {
		alert("Error." + e)
	}

	AJAX.onload = function() {
		if (this.status == 200) {
			console.log("Sucessfully loaded, below is responseText.")
			console.log(this.responseText);
		}
		else{
			alert(this.status);
			console.log("error");
	}}
	AJAX.open("GET", url + "signup?email="+email.value+"&username="+username.value+"&password="+pw.value);
	console.log("GET", url + "signup?email="+email.value+"&username="+username.value+"&password="+pw.value);
	AJAX.send();
});
