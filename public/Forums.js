const divs = document.getElementsByTagName("div");
const url = 'http://34.135.190.211/'


let AJAX = new XMLHttpRequest();

AJAX.onerror = function(e) {
	console.log(e);
}

AJAX.onload = function() {
	if(this.status == 200){
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
    }
}

