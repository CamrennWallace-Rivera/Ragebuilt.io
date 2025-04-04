const submit = document.getElementById("submit_button");
const picture = document.getElementById("photo");

function upload_pic(file){
	console.log(file);

	const formData = new FormData();
	formData.append('filetoupload', file);
	formData.append('title', document.getElementById("title").value);
	formData.append('content', document.getElementById("content").value);
	formData.append('email', email);

	fetch("/fileupload", {
		method: "POST",
		body: formData,
	})
	.then(response => response.text())
	.then(data => {
		console.log("Server response: ", data);
	})
	window.location.href = 'Forums.html';
}

submit.addEventListener('click', (e) => {
	e.preventDefault();
	const title = document.getElementById("title").value;
	const content = document.getElementById("content").value;
	const picture = document.getElementById("photo");

	console.log("picture.files: " + picture.files);
	if(picture.files.length > 0) {
		console.log("Exists : " + picture.files[0]);
		upload_pic(picture.files[0]);
	}
	else{
	var email = sessionStorage.getItem("email");
	let AJAX = new XMLHttpRequest();

	AJAX.onerror = function(e) {
		alert("Error." + e)
	}

	AJAX.onload = function() {
		if (this.status == 200) {
			console.log('this.responsetext: ', this.responseText);
			window.location.href = 'Forums.html';
		}
		else{
			console.log("error", this.status);
		}
	}
	
	AJAX.open("POST", "/forum_post?title="+title+"&description="+content+"&email="+email, true);
	AJAX.send();
	}
});

