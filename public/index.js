const isLoggedin = sessionStorage.getItem("isLoggedin");
const email = sessionStorage.getItem("email");
const logout = document.getElementById("logout");
console.log("Is logged in: " + isLoggedin);
console.log("email: " + email);

var loginBtn = document.getElementById("login");
var signUpBtn = document.getElementById("signup");
var profile = document.getElementById("profilePic");


if (isLoggedin == "true") {
	loginBtn.classList.add("hidden");
	signUpBtn.classList.add("hidden");
	profile.classList.remove("hidden");
};

logout.addEventListener('click', function() {
	sessionStorage.setItem("isLoggedin", "false");
})
