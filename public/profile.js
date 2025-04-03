const username = document.getElementById("username");
const description = document.getElementById("description");
const edit_profile = document.getElementById("edit_profile_btn");
const profilePic = document.getElementById("profile_pic");
const topdiv = document.getElementById("top-div");

edit_profile.addEventListener("click", editProfile);

function editProfile(){
	console.log("clicked edit profile.");
	edit_profile_html = `<div class="relative group w-110 h-80 ml-12">
            <label for="profile_pic_input" class="block w-full h-full">
                <img id="profile_pic" src="${profilePic.src}" 
                     class="w-110 h-80 border-3 transition-opacity duration-300 group-hover:opacity-50">
                <!-- Hover Text -->
                <div class="cursor-pointer absolute inset-0 flex items-center justify-center bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img src="edit_logo.png">
                </div>
            </label>
        </div>`;
	profilePic.insertAdjacentHTML("afterend",edit_profile_html);
	profilePic.remove()
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
