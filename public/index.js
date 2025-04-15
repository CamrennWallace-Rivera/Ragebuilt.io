const isLoggedin = sessionStorage.getItem("isLoggedin");
const email = sessionStorage.getItem("email");
const uname = sessionStorage.getItem("username");
const logout = document.getElementById("logout");
console.log("Is logged in: " + isLoggedin);
console.log("email: " + email);

var loginBtn = document.getElementById("login");
var signUpBtn = document.getElementById("signup");
var profile = document.getElementById("profilePic");
var profile_picture = document.getElementById("profile_picture");


if (isLoggedin == "true") {
	loginBtn.classList.add("hidden");
	signUpBtn.classList.add("hidden");
	profile.classList.remove("hidden");
	set_profile_picture();
};

logout.addEventListener('click', function() {
	sessionStorage.setItem("isLoggedin", "false");
	sessionStorage.setItem("email", "none");
	sessionStorage.setItem("username", "none");
})

async function set_profile_picture(){
	try{
		const response = await fetch(`request_profile?email=${email}`);
		if(!response.ok){
			throw new Error("error.");
		}
		const data = await response.json();
		if(data[0].profile_pic == null){
			profile_picture.src = 'default_pfp.jpg';
		}
		else{
			profile_picture.src = data[0].profile_pic;
		}
	}
	catch (error){
		console.error(`Error loading profile: ${error}`);
	}
}
