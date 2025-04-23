function route_to_profile(vb_email){
	sessionStorage.setItem("profile_route_email", vb_email);
	window.location.href = "profile.html";
}


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

		document.getElementById("vb-name").textContent = vb_data[0].vb_name || "No Vehicle Name";
        	document.getElementById("vb-price").textContent = vb_data[0].vb_price ? `$${vb_data[0].vb_price}` : "$0";
        	document.getElementById("vb-engine-name").innerHTML = `${vb_data[0].engine_name}`;
		document.getElementById("vb-engine-price").innerHTML = "$" + vb_data[0].engine_price;
		document.getElementById("vb-engine-from").innerHTML = vb_data[0].engine_store;
		document.getElementById("vb-transmission-name").innerHTML = `${vb_data[0].transmission_name}`;
		document.getElementById("vb-transmission-price").innerHTML = "$" + vb_data[0].transmission_price;
		document.getElementById("vb-transmission-from").innerHTML = vb_data[0].transmission_store;
		document.getElementById("vb-clutch-name").innerHTML = `${vb_data[0].clutch_name}` || "N/A";
		document.getElementById("vb-clutch-price").innerHTML = "$" + vb_data[0].clutch_price;
		document.getElementById("vb-clutch-from").innerHTML = vb_data[0].clutch_store;
		document.getElementById("vb-comments").textContent = vb_data[0].owner_comments || "No comments provided.";
		document.getElementById("vb-specs").textContent = vb_data[0].additional_specs || "No additional specifications provided.";
		document.getElementById("vb-username").textContent = "@" + vb_data[0].username;
		document.getElementById("vb_picture").src = vb_data[0].vb_picture || "default_pfp.jpg";
		document.getElementById("vb-tires-name").innerHTML =`${vb_data[0].tire_name}`;
		document.getElementById("vb-tires-price").innerHTML = "$" + vb_data[0].tire_price;
		document.getElementById("vb-tires-from").innerHTML = vb_data[0].tire_store;
		document.getElementById("vb-brakes-name").innerHTML = `${vb_data[0].brake_name}`;
		document.getElementById("vb-brakes-price").innerHTML = `$${vb_data[0].brake_price}`;
		document.getElementById("vb-brakes-from").innerHTML = vb_data[0].brake_store 
		document.getElementById("vb-muffler-name").innerHTML = `${vb_data[0].muffler_name}`;
		document.getElementById("vb-muffler-price").innerHTML = `$${vb_data[0].muffler_price}`;
		document.getElementById("vb-muffler-from").innerHTML = `${vb_data[0].muffler_store}`;
		document.getElementById("vb_picture").classList.add("h-100");

		const vb_email = vb_data[0].email;
		document.getElementById('vb-username').addEventListener('click', () => route_to_profile(vb_email))
	}

       	else{
		console.log(this.status);
	}
}

const vehicle_id = sessionStorage.getItem("selected_vb");
console.log("vb_id being passed to server: " + vehicle_id);
AJAX.open("GET", `populate_vb?vb_id=${vehicle_id}`);
AJAX.send();
