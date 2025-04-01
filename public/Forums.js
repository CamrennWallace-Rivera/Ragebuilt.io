const divs = document.querySelectorAll(".forum-box");
const url = 'http://34.135.190.211/'
const create_btn = document.getElementById("create_btn");
const search = document.getElementById("search");

create_btn.addEventListener('click', create_post);
search.addEventListener('input', search_forums);

function search_forums() {
	console.log("query: " + search.value);

	let AJAX = new XMLHttpRequest();

	AJAX.onerror = function(e) {
		console.log(e);
	}

	AJAX.onload = function() {
		if(this.status == 200){
			var json = JSON.parse(this.responseText);
			console.log("Res text: " + this.responseText);
			delete_forums(json);
			populate_forums(json);

		}
		else{
			console.log(this.status);
		}
	}

	AJAX.open("GET", "search_forum?search_query="+search.value);
	AJAX.send();
}

function delete_forums(response){
	for(let i = 0; i < 5; i++){
		const innerPs = divs[i].querySelectorAll("div > p");
		innerPs[0].innerHTML = "";
		innerPs[1].innerHTML = "";
		innerPs[2].innerHTML = "";
	}
}

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

function click_on_post(forum_idx){
	const forum_id = sessionStorage.getItem(`forum_id_${forum_idx}`);
	sessionStorage.setItem("selected_forum", forum_id);
	window.location.href = 'display_forum.html';
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
		set_forum_ids(response);
	}
	else{
		console.log(this.status)
	}
}

AJAX.open("GET", url + "get_forum_posts");
AJAX.send();

function populate_forums(response){
	for (let i = 0; i < response.length; i++) {
		var localDate = new Date(response[i].created_at);


		const innerPs = divs[i].querySelectorAll("div > p");
		innerPs[0].innerHTML = response[i].title;
		innerPs[1].innerHTML = "@" + response[i].username;
		innerPs[2].innerHTML = localDate.toLocaleString();

		divs[i].addEventListener('click', () => click_on_post(i+1))
		}
	}


function set_forum_ids(response){
	for(let i = 0; i < response.length; i++){
		sessionStorage.setItem(`forum_id_${i+1}`, response[i].forum_id);
	}
}
