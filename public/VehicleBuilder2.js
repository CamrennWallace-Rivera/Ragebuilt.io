// JS for adding more spec fields dynamically
document.getElementById('addSpecBtn').addEventListener('click', function() {
    const newSpecField = document.createElement('textarea');
    newSpecField.setAttribute('name', 'specs[]');
    newSpecField.setAttribute('rows', '2');
    newSpecField.setAttribute('placeholder', 'Additional spec...');
    newSpecField.classList.add('border', 'border-gray-300', 'rounded', 'p-4', 'w-full', 'text-sm', 'text-gray-700', 'placeholder-gray-400', 'mt-2');
    document.getElementById('additionalSpecsContainer').appendChild(newSpecField);
});

// JS for media preview (supporting multiple images/videos)
document.getElementById('mediaUpload').addEventListener('change', function(event) {
    const previewContainer = document.getElementById('mediaPreview');
    previewContainer.innerHTML = '';  // Clear previous previews

    Array.from(event.target.files).forEach(file => {
        const mediaElement = document.createElement(file.type.startsWith('image') ? 'img' : 'video');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.classList.add('w-32', 'h-32', 'object-cover', 'border', 'border-gray-300', 'rounded', 'm-2');
        mediaElement.controls = file.type.startsWith('video');  // Add controls for video files
        previewContainer.appendChild(mediaElement);
    });
});

document.getElementById("go_back").addEventListener('click', function(e) {
	window.location.href = 'VehicleBuilder.html';
})



document.getElementById("submit_vb").addEventListener('click', function(e) {
	console.log("clicked submit.");
	const vehicle_build_name = document.getElementById("vehicleBuildname").value;
	const own_comments = document.getElementById("ownerComments").value;
	const buildData = JSON.parse(sessionStorage.getItem("buildData"));
	const additional_specs = document.getElementById("additionalSpecs").value;
	const vehicle_price = document.getElementById("vehicle_price").value;
	const mediaupload = document.getElementById('mediaUpload');

	let AJAX = new XMLHttpRequest();

	AJAX.onerror = function(e) {
		alert("Error : " + e)
	}
	AJAX.onload = function() {
		if(this.status == 200){
			let response = JSON.parse(this.responseText);
			sessionStorage.setItem("selected_vb", response.vb_id);
			//check if we need to upload pic.
			if (mediaupload.files.length > 0) {
				upload_pic(mediaupload.files[0], response.vb_id);
			}
			console.log("VB ID: " + this.responseText);
			window.location.href = 'UserVehiclePost.html';
		}
		else{
			console.log("Some error.");
		}
	}
	AJAX.open("GET", `submit-vb?vb_name=${vehicle_build_name}&email=${email}&username=${uname}&vehicle_price=${vehicle_price}&owner_comments=${own_comments}&additional_specs=${additional_specs}&brakes_name=${buildData.brakes.name}&brakes_price=${buildData.brakes.price}&brakes_store=${buildData.brakes.store}&muffler_name=${buildData.muffler.name}&muffler_price=${buildData.muffler.price}&muffler_store=${buildData.muffler.store}&engine_name=${buildData.engine.name}&engine_price=${buildData.engine.price}&engine_store=${buildData.engine.store}&transmission_name=${buildData.transmission.name}&transmission_price=${buildData.transmission.price}&transmission_store=${buildData.transmission.store}&clutch_name=${buildData.clutch.name}&clutch_price=${buildData.clutch.price}&clutch_store=${buildData.clutch.store}&tires_name=${buildData.tires.name}&tires_price=${buildData.tires.price}&tires_store=${buildData.tires.store}`);
	AJAX.send();
	
});

async function upload_pic(file, vb_id){
	console.log("File: " + file);

	const formData = new FormData();
	formData.append('filetoupload', file);
	formData.append('vb_id', vb_id);

	const response = await fetch("/fileupload2?check=true", {
		method: "POST",
		body: formData,
	});
	const data = await response.text();
	console.log("data from pic: " + data);
}
