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
			const forum_divs = document.querySelectorAll(".forum-box");
			var json = JSON.parse(this.responseText);
			console.log("Res text: " + this.responseText);
			delete_forums(json, forum_divs);
			populate_forums(json);
			set_forum_ids(json);
		}
		else{
			console.log(this.status);
		}
	}

	AJAX.open("GET", "search_forum?search_query="+search.value);
	AJAX.send();
}

function delete_forums(response, forum_divs){
	forum_divs.forEach(forum => forum.remove());
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
	const search_bar = document.getElementById("search");
	let t = 125;
	for (let i = 0; i < response.length; i++){
		var localDate = new Date(response[i].created_at);

		forum_HTML = `<div class="forum-box absolute right-[-800px] top-[${t}%] px-5 py-3 w-[600px] h-[60px]  bg-gray-300 rounded-lg border border-gray-400 mt-4 cursor-pointer transistion duration-200 hover:bg-gray-100">
        	<p class="text-gray-700 font-bold">${response[i].title}</p>
        	<div class="flex items-center justify-between">
        	<p class="text-gray-700 text-xs">${response[i].username} </p>
        	<p class="text-gray-700 text-xs">${localDate.toLocaleString()}  </p>
        	</div>
    		</div>`
		search_bar.insertAdjacentHTML('afterend', forum_HTML);
		let forumElement = search_bar.nextElementSibling; 
        	forumElement.addEventListener("click", () => click_on_post(i+1));
		t = t + 100;
	}
}



function set_forum_ids(response){
	for(let i = 0; i < response.length; i++){
		sessionStorage.setItem(`forum_id_${i+1}`, response[i].forum_id);
	}
}
