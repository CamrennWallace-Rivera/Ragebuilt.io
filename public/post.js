const submit = document.getElementById("submit_button");
const url = 'http://34.135.190.211/';

submit.addEventListener('click', (e) => {
	e.preventDefault();
	const title = document.getElementById("title").value;
	const content = document.getElementById("content").value;
	const picture = document.getElementById("photo");
	var email = sessionStorage.getItem("email");
	let formData = new FormData();
	let AJAX = new XMLHttpRequest();


	formData.append("title", title);
	formData.append("description", content);

	if(picture.files.length > 0) {
		formData.append("photo", picture.files[0]);
	}

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
	//AJAX.open("GET", url + "forum_post?title="+title+"&description="+content);
	//console.log(url + "forum_post?title="+title+"&description="+content);
	AJAX.send();
});
