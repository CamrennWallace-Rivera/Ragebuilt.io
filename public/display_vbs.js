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

function populate_vb_boxes(data){
	const uname_boxes = document.querySelectorAll('.vb_usernames');
	const vb_name_boxes = document.querySelectorAll('.vb_names');
	const vb_price_boxes = document.querySelectorAll('.vb_prices');

	console.log(uname_boxes);

	for(let i = 0; i < uname_boxes.length; i++){
		uname_boxes[i].textContent = data[i].username;
		vb_name_boxes[i].textContent = data[i].vb_name;
		vb_price_boxes[i].textContent = data[i].vb_price;
	}
};

display_VBs();
