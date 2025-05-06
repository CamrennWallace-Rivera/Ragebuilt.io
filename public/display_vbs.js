var vb_boxes = document.querySelectorAll(".vb");

async function display_VBs(){
	try{
		const response = await fetch('completed_builds');
		if(!response.ok){
			throw new Error("error");
		}
		const data = await response.json();
		console.log(data);
		populate_vb_boxes(data);
	}
	catch(error){
		console.error("error" + error);
	}
}

function click_on_vb(vb_id){
	sessionStorage.setItem("selected_vb", vb_id);
	window.location.href = 'UserVehiclePost.html';
}

function populate_vb_boxes(data){
	const uname_boxes = document.querySelectorAll('.vb_usernames');
	const vb_name_boxes = document.querySelectorAll('.vb_names');
	const vb_price_boxes = document.querySelectorAll('.vb_prices');
	const vb_pictures = document.querySelectorAll('.vb_pictures');

	for(let i = 0; i < uname_boxes.length; i++){
		const vb_id = data[i].vb_id;
		if(data[i].vb_picture){
			vb_pictures[i].src = data[i].vb_picture;
		}
		uname_boxes[i].textContent = "@" + data[i].username;
		vb_name_boxes[i].textContent = data[i].vb_name;
		vb_price_boxes[i].textContent = "$" + data[i].vb_price;
		vb_boxes[i].addEventListener('click', () => click_on_vb(vb_id));
	}
};

display_VBs();

