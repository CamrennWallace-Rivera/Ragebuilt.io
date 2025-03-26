const isLoggedin = sessionStorage.getItem("isLoggedin");
const username = sessionStorage.getItem("username");
console.log("Is loggedin? : " + isLoggedin);
console.log("Username? :" + username);

var loginBtn = document.getElementById("login");
var signUpBtn = document.getElementById("signup");
var profile = document.getElementById("profilePic");


if (isLoggedin == "true") {
	loginBtn.classList.add("hidden");
	signUpBtn.classList.add("hidden");
	profile.classList.remove("hidden");
};
