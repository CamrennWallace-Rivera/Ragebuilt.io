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
                        if (this.responseText == "Invalid Login") {
                                invalidLogin(pw);
                        }
                        else{
                                sessionStorage.setItem("isLoggedin", true);
                                let json = JSON.parse(this.responseText);
                                console.log("Returned json: ", json)
                        }
                }
                else{
                        console.log("error");
        }}
        AJAX.open("GET", url + "login?email="+email.value+"&password="+pw.value);
        console.log("GET", url + "login?email="+email.value+"&password="+pw.value);
        AJAX.send();

});

function invalidLogin(pw) {
        const pwDiv = pw.closest("div");

        let existingError = document.getElementById("login-error");
        if (existingError) {
                existingError.remove();
        }
        const errorDiv = document.createElement("div");
        errorDiv.id = "login-error";
        errorDiv.className = "flex items-center justify-center mt-2";
        errorDiv.innerHTML = `<p class="text-red-800 font-bold"> Invalid Credentials, try again. </p>`;
        pwDiv.parentNode.insertBefore(errorDiv, pwDiv.nextSibling);
};