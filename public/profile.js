const username = document.getElementById("username");
const description = document.getElementById("description");
const edit_profile = document.getElementById("edit_profile_btn");
const profilePic = document.getElementById("profile_pic");


edit_profile.addEventListener("click", () => editProfile());

function editProfile(){
	console.log("clicked edit profile.");
}

//When adding vehicle builder, need to request car name, price, ownercomments/car description?
async function load_profile_page(){
	try {
		const response = await fetch(`/request_profile?email=${email}`);
		if(!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		console.log("profile info: " + data[0]);
		if(data[0].profile_pic == null){
			profilePic.src = "default_pfp.jpg";
		}
		else{
			profilePic.src = data[0].profile_pic;
		}
		username.innerHTML = "@" + data[0].username;
		description.innerHTML = data[0].profile_desc;
	}
	catch (error){
		console.error("Error loading profile: ", error);
	}
}

load_profile_page();
