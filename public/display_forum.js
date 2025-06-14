const forum_title = document.getElementById("forum_title");
const post_username = document.getElementById("post-username");
const post_content = document.getElementById("post-content");
const post_date = document.getElementById("post-date");
const forum_id = sessionStorage.getItem("selected_forum");
var comment_textfield = document.getElementById("new-comment");
const post_comment = document.getElementById("submit-comment");
const username = sessionStorage.getItem("username");
const div_above_img = document.getElementById("div_above_img");
const forum_profile_pic = document.getElementById("forum_profile_pic");

console.log("forum_id: "+ forum_id);

post_comment.addEventListener('click', post_comment_func);

function route_profile(user_forum_email){
	console.log("user_forum_email: " + user_forum_email);
	sessionStorage.setItem("profile_route_email", user_forum_email);
	window.location.href = "profile.html";
}


function post_comment_func(){
	console.log(isLoggedin);
	if (isLoggedin == "false" || isLoggedin == null){
		const login_msg_check = document.getElementById("warning_msg");
		if (login_msg_check){
			login_msg_check.remove();
		}
		console.log("Cannot post, not logged in.");
		const login_msg = document.createElement("p");
		login_msg.innerHTML = "Login to Post Comment.";
		login_msg.className = "text-red-700 font-extrabold";
		login_msg.id = "warning_msg";
		post_comment.after(login_msg);

	}
	else{
		console.log(comment_textfield.value);
		if(comment_textfield.value == ""){
			const login_msg_check2 = document.getElementById("warning_msg2");
			if (login_msg_check2){
				login_msg_check.remove();
			}
			const login_msg2 = document.createElement("p");
			login_msg2.innerHTML = "Enter text to post comment.";
			login_msg2.className = "text-red-700 font-extrabold";
			login_msg2.id = "warning_msg2";
			post_comment.after(login_msg2);
		}
		else{
	let commentAJAX = new XMLHttpRequest();

	commentAJAX.onerror = function(e) {
        	console.log(e);
	}

	commentAJAX.onload = function() {
        	if(this.status == 200) {
                	var comments = JSON.parse(this.responseText);
                	console.log(comments);
                	populateComments(comments);
        	}
        	else{
                	console.log(this.status);
        	}
	}
	

	commentAJAX.open("GET", `add_comment?forum_id=${forum_id}&username=${username}&comment_desc=${comment_textfield.value}&email=${email}`);
	commentAJAX.send();
}}}

let AJAX = new XMLHttpRequest();

AJAX.onerror = function(e) {
	console.log(e);
}

AJAX.onload = function() {
	if(this.status == 200){
		console.log("forum data: " + this.responseText);
		var json = JSON.parse(this.responseText)[0];
		const user_email = json.email;
		const page_title = json.title;
		const page_username = json.username;
		const page_content = json.description;
		const page_date_created = json.created_at;
		const photo = json.filepath
		const user_prof_pic = json.profile_pic;
		post_username.addEventListener('click', () => route_profile(user_email));


		const localDate = new Date(page_date_created);

		if(user_prof_pic !== null){
			forum_profile_pic.src = user_prof_pic;
		}
		else{
			forum_profile_pic.src = "default_pfp.jpg";
		}
		forum_title.innerHTML = page_title;
		post_username.innerHTML = "@" + page_username;
		post_content.innerHTML = page_content;
		post_date.innerHTML = localDate.toLocaleString();
		//Display picture, if there is one.
		if (photo !== null) {
			const image_tag = document.createElement("img");
			image_tag.src = photo;
			div_above_img.after(image_tag);
		}
	}
	else{
		console.log(this.status);
	}
}

AJAX.open("GET", `forums_id?forum_id=${forum_id}`);
AJAX.send();

let commentAJAX = new XMLHttpRequest();

commentAJAX.onerror = function(e) {
	console.log(e);
}

commentAJAX.onload = function() {
	if(this.status == 200) {
		var comments = JSON.parse(this.responseText);
		console.log(comments);
		populateComments(comments);
		var post_comment_uname = document.querySelectorAll(".post-comment-uname");
		for(let i = 0; i < post_comment_uname.length; i++){
			const comment_email = comments[i].email;
			post_comment_uname[i].addEventListener('click', () => route_profile(comment_email));
		}
	}
	else{
		console.log(this.status);
	}
}

commentAJAX.open("GET", `comments?forum_id=${forum_id}`);
commentAJAX.send();

function populateComments(comments){
	const container = document.getElementById('comments-container');
   	const count = document.getElementById('comment-count');
	comment_textfield.value = '';

   	// Clear any existing content
   	container.innerHTML = '';

   	 // Set the comment count
   	count.innerHTML = comments.length;

	comments.forEach(comment => {
		const localDate = new Date(comment.comment_date).toLocaleString();
		if(comment.profile_pic == null){
			comment.profile_pic = "default_pfp.jpg";
		}
		const commentHTML = `
		    <div class="mb-6 pb-6 border-b border-gray-200 last:border-0">
			<div class="flex items-center mb-3">
			    <div class="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
				<img src="${comment.profile_pic}" alt="Comment User Avatar" class="w-full h-full object-cover" />
			    </div>
			    <div>
				<p class="post-comment-uname font-bold text-blue-600 cursor-pointer">${comment.username}</p>
				<p class="text-gray-500 text-xs">${localDate}</p>
			    </div>
			</div>
			<div class="ml-12">
			    <p>${comment.comment_desc}</p>
			</div>
		    </div>
		`;

		container.insertAdjacentHTML('beforeend', commentHTML);
    });
}
