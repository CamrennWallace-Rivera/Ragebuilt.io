const signInBtn = document.getElementById("submit_button");
const url = 'http://34.135.190.211/'


signInBtn.addEventListener("click", (e) => {
	e.preventDefault();
	var email = document.getElementById("email");
	var pw = document.getElementById("pw");

	let AJAX = new XMLHttpRequest();

        AJAX.onerror = function(e) {
                alert("Error." + e)
        }

        AJAX.onload = function() {
                if (this.status == 200) {
                        console.log("Sucessfully loaded, below is responseText.")
                        console.log(this.responseText);
                }
                else{
                        alert(this.status);
                        console.log("error");
        }}
        AJAX.open("GET", url + "login?email="+email.value+"&password="+pw.value);
        console.log("GET", url + "login?email="+email.value+"&password="+pw.value);
        AJAX.send();

});
