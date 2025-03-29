const divs = document.getElementsByTagName("div");
const url = 'http://34.135.190.211/'
const create_btn = document.getElementById("create_btn");

create_btn.addEventListener('click', create_post);

function create_post(){
	const loginMsg = document.getElementById('loginMessage');
	if (isLoggedin == "true"){
		window.location.href="post.html";
	}
	else{
		if (loginMsg){
			loginMsg.remove();
		}
		const loginMessage = document.createElement('div');
		loginMessage.id = "loginMessage";
		loginMessage.className = "font-[Agbalumo] mt-[10px] ml-[110px] text-1xl font-bold text-red-600";
		loginMessage.innerHTML = "Login to Create a Forum";

		create_btn.after(loginMessage);
	}
}


let AJAX = new XMLHttpRequest();

AJAX.onerror = function(e) {
	console.log(e);
}

AJAX.onload = function() {
	if(this.status == 200){
		console.log(JSON.parse(this.responseText));
		response = JSON.parse(this.responseText);
		populate_forums(response);
	}
	else{
		console.log(this.status)
	}
}

AJAX.open("GET", url + "get_forum_posts");
AJAX.send();

function populate_forums(response){
	for (let i = 5, j = 0; i < divs.length && j < response.length; i++, j++) {
		divs[i].getElementsByTagName("p")[0].innerHTML = response[j].title;
		divs[i].getElementsByTagName("p")[1].innerHTML = "@" +  response[j].username;

    }
}

