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

function clicked_on_vb(vb_id){
	sessionStorage.setItem("selected_vb", vb_id);
	window.location.href = "UserVehiclePost.html";
}

//When adding vehicle builder, need to request car name, price, ownercomments/car description?
async function load_profile_page(){
	try {
		const imgs = document.querySelectorAll(".vb_img");
		const vb_name = document.querySelectorAll(".vb_name");
		const vb_price = document.querySelectorAll(".vb_price");
		//const vb_boxes = document.querySelectorAll(".vb_boxes");
		let response;
		if(sessionStorage.getItem("profile_route_email")){
			//If we are on someone elses profile, then remove edit button.
			console.log(sessionStorage.getItem("profile_route_email") + " " + email);
			if(sessionStorage.getItem("profile_route_email") !== email){
				edit_profile.remove();
			}
			var clicked_email = sessionStorage.getItem("profile_route_email");
			response = await fetch(`/request_profile?email=${clicked_email}`);
		}
		else{
			response = await fetch(`/request_profile?email=${email}`);
		}
		if(!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		console.log("profile info: ", data);
		//Populate profile portion of the page
		if(data[0].profile_pic == null){
			profilePic.src = "default_pfp.jpg";
		}
		else{
			profilePic.src = data[0].profile_pic;
		}
		username.innerHTML = "@" + data[0].username;
		description.innerHTML = data[0].profile_desc;

		//Populate vehicle builder portion of the page
		console.log("data length: " + data.length);
		const vb = document.getElementById("vehicle_builder");	
		const vb_text = document.getElementById("vb_text");
		vb_text.innerHTML = `Vehicle Builds (${data.length})`;
		for(let i = 0; i < data.length; i++){
			if(!data[i].vb_picture){
				vb_text.innerHTML = `Vehicle Builds (${data.length-1})`;
				return;
			}
			var vb_html = `<div class="vb_boxes border-2 h-100 w-110 ml-12.5 rounded-xl overflow-hidden cursor-pointer">
            		<p class="vb_name w-full h-10 bg-amber-400 flex justify-center items-center font-bold"> ${data[i].vb_name} </p>
            		<img src="${data[i].vb_picture}" class="vb_img w-110 h-60">
           		 <p class="h-10 ml-2"> </p>
            		<p class="vb_price h-10 ml-2"> ${data[i].vb_price} </p>
            		<p class="h-10 ml-2">  </p>
        		</div>`;
			vb.insertAdjacentHTML('beforeend', vb_html);
		}
		const vb_boxes = document.querySelectorAll('.vb_boxes');
		for(let i = 0; i < data.length; i++){
			const vb_id = data[i].vb_id;
			vb_boxes[i].addEventListener('click', () => clicked_on_vb(vb_id));
		}
		/*
		for(let i = 0; i < data.length; i++){
			if(data[i].vb_picture == null){
				imgs[i].src = 'default_pfp.jpg';
			}
			else{
				imgs[i].src = data[i].vb_picture;
			}
			vb_name[i].textContent = data[i].vb_name;
			vb_price[i].textContent = data[i].vb_price;
			const vb_id = data[i].vb_id;
			vb_boxes[i].classList.add('cursor-pointer');
			vb_boxes[i].addEventListener('click', () => clicked_on_vb(vb_id));
		}
		*/
	}
	catch (error){
		console.error("Error loading profile: ", error);
	}
}

load_profile_page();
