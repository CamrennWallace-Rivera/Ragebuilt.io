const isLoggedin = sessionStorage.getItem("isLoggedin");
const username = sessionStorage.getItem("username");
const email = sessionStorage.getItem("email");
console.log("Is logged in: " + isLoggedin);
console.log("Username: " + username);
console.log("email: " + email);

var loginBtn = document.getElementById("login");
var signUpBtn = document.getElementById("signup");
var profile = document.getElementById("profilePic");


if (isLoggedin == "true") {
	loginBtn.classList.add("hidden");
	signUpBtn.classList.add("hidden");
	profile.classList.remove("hidden");
};
