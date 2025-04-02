const forum_title = document.getElementById("forum_title");
const post_username = document.getElementById("post-username");
const post_content = document.getElementById("post-content");
const post_date = document.getElementById("post-date");
const forum_id = sessionStorage.getItem("selected_forum");
var comment_textfield = document.getElementById("new-comment");
const post_comment = document.getElementById("submit-comment");
const username = sessionStorage.getItem("username");
const div_above_img = document.getElementById("div_above_img");

console.log("forum_id: "+ forum_id);
console.log("username: " + username);

post_comment.addEventListener('click', post_comment_func);

function post_comment_func(){
	if (isLoggedin == "false"){
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
}}

let AJAX = new XMLHttpRequest();

AJAX.onerror = function(e) {
	console.log(e);
}

AJAX.onload = function() {
	if(this.status == 200){
		console.log(this.responseText);
		var json = JSON.parse(this.responseText)[0];
		const page_title = json.title;
		const page_username = json.username;
		const page_content = json.description;
		const page_date_created = json.created_at;
		const photo = json.filepath
		console.log("file path: " + photo);

		const localDate = new Date(page_date_created);

		forum_title.innerHTML = page_title;
		post_username.innerHTML = "@" + page_username;
		post_content.innerHTML = page_content;
		post_date.innerHTML = localDate.toLocaleString();
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

        const commentHTML = `
            <div class="mb-6 pb-6 border-b border-gray-200 last:border-0">
                <div class="flex items-center mb-3">
                    <div class="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                        <img src="smaller-DSC_5602-1024x682.jpg" alt="Comment User Avatar" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p class="font-bold text-blue-600">${comment.username}</p>
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
