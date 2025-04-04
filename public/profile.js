const username = document.getElementById("username");
let description = document.getElementById("description");
const edit_profile = document.getElementById("edit_profile_btn");
let profilePic = document.getElementById("profile_pic");
const topdiv = document.getElementById("top-div");
const profile_text = document.getElementById("profile_text");
const top_div_textbox = document.getElementById("top-div-textbox");
edit_profile.addEventListener("click", editProfile);
let isEditing = false;

function editProfile(){
	console.log("clicked edit profile.");
	if(!isEditing){
		console.log("entering editing mode: ");
		description = document.getElementById("description");
		var user_input_box =  `<textarea id="description" class="border p-2 w-full">${description.textContent}</textarea>`;
		if(description){
			description.remove();
		}
		top_div_textbox.insertAdjacentHTML("afterbegin", user_input_box);
		profilePic = document.getElementById("profile_pic");
		if(profilePic){
			profilePic.remove();
		}
		var image_input = `<div class="relative group w-110 h-80 ml-12" id="image_input_div">
            	<label for="profile_pic_input" class="block w-full h-full">
                <img id="profile_pic" src="${profilePic.src}" 
                     class="w-110 h-80 border-3 transition-opacity duration-300 group-hover:opacity-50">
                <!-- Hover Text -->
                <div class="cursor-pointer absolute inset-0 flex items-center justify-center bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img src="edit_logo.png">
		    <input type="file" accept="image/*" id="profile_pic_input" name="profile_pic_input" class="hidden">
                </div>
       		 </label>
       		 </div>`;
		topdiv.insertAdjacentHTML("afterbegin", image_input);
		const profile_pic_input = document.getElementById("profile_pic_input");
		profile_pic_input.addEventListener("change", display_profile_picture);
		profile_text.textContent = "Finish";
		isEditing = true;
	}
	else{
		console.log("Exiting editing mode. ");
		profilePic = document.getElementById("profile_pic");
		description  = document.getElementById("description");

		save_profile_changes(description);

		var original_pic = `<img id="profile_pic" src="${profilePic.src}" class="w-110 h-80 border-3 ml-12">`;
		const image_input_div = document.getElementById("image_input_div");
		image_input_div.remove();
		document.getElementById("top-div").insertAdjacentHTML("afterbegin", original_pic);
		description.outerHTML = `<p id="description">${description.value}</p>`;
		profile_text.textContent = "Edit Profile";
		isEditing = false;
	}
}

async function save_profile_changes(description){
	try{
		const fileInput = document.getElementById("profile_pic_input");
		const file = fileInput?.files[0];
		const formData = new FormData();
		if(file){
			console.log(file + " file");
			formData.append("filetoupload", file);
			formData.append("photo_exists", "true");
		}
		else{formData.append("photo_exists", "false");}
		formData.append("description", description.value);
		formData.append("email", email);
		const response = await fetch(`/update_profile`,{
			method: "POST",
			body: formData
		});
		if(!response.ok){
			throw new Error(response.status);
		}
		const data = await response.text();
		console.log("responding data: " + data);
	}
	catch(error){
		console.error(error);
	}

}

function display_profile_picture(){
	const file = event.target.files[0];

	if (file){
		const reader = new FileReader();
		reader.onload = function(e){
			var profile_pic = document.getElementById("profile_pic").src = e.target.result;
		}
		reader.readAsDataURL(file);
	}
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
