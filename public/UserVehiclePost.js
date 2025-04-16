
let AJAX = new XMLHttpRequest();

AJAX.onerror = function(e){
	alert("error: " + e);
}

AJAX.onload = function() {
	if(this.status == 200) {
		console.log(this.responseText);
		var vb_data = JSON.parse(this.responseText);

		vb_data.forEach(item => {
		    Object.keys(item).forEach(key => {
			if (item[key] === null) {
			    item[key] = "";
			}
		    });
		});
		console.log("transmission name: " + vb_data[0].transmission_name);
		console.log("clutch price: " + vb_data[0].clutch_price);

		document.getElementById("vb-name").textContent = vb_data[0].vb_name || "No Vehicle Name";
        	document.getElementById("vb-price").textContent = vb_data[0].vb_price ? `$${vb_data[0].vb_price}` : "$0";
        	document.getElementById("vb-engine-name").innerHTML = `<strong>Engine:</strong> ${vb_data[0].engine_name}`;
		document.getElementById("vb-transmission-name").innerHTML = `<strong>Transmission:</strong> ${vb_data[0].transmission_name}`;
		document.getElementById("vb-clutch-name").innerHTML = `<strong>Clutch:</strong> ${vb_data[0].clutch_name}`;
		document.getElementById("vb-comments").textContent = vb_data[0].owner_comments || "No comments provided.";
		document.getElementById("vb-specs").textContent = vb_data[0].additional_specs || "No additional specifications provided.";
		document.getElementById("vb-username").textContent = "@" + vb_data[0].username;
		document.getElementById("vb_picture").src = vb_data[0].vb_picture || "default_pfp.jpg";
	}

       	else{
		console.log(this.status);
	}
}

const vehicle_id = sessionStorage.getItem("selected_vb");
console.log("vb_id being passed to server: " + vehicle_id);
AJAX.open("GET", `populate_vb?vb_id=${vehicle_id}`);
AJAX.send();
