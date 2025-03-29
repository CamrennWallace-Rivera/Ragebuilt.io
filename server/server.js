// server.js

const http = require("http");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const hostname = '0.0.0.0';
const port = 80;
const url = require('url');

const connectionObj = {
	host     : '34.28.200.137',
	user     : 'root',
	password : `Js)fbEq{[By\\d7#=`,
	database : 'ragebuilt',
	connectionLimit : 10
}

function determineContentType(fileNamePath){
        switch(path.extname(fileNamePath)){
                case ".jpg":
                        return "image/jpg";
                case ".png":
                        return "image/png";
                case ".html":
                        return "text/html";
                case ".js":
                        return "text/javascript";
                case ".css":
                        return "text/css";
                case ".wav":
                        return "audio/wav";
                case ".mp3":
                        return "audio/mpeg";
                default:
                        return "text/plain";
        }
};


function writeOut(fileNamePath, res){
        fs.readFile("public"+fileNamePath, function(err,content){
                if (err) {
                        return console.log(err);
                }
                else{
                        res.writeHead(200, {'Content-Type': determineContentType(fileNamePath)});
                        res.write(content);
                        res.end();
 		}
        });
};

function handleLogin(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	
	connection_pool.query("SELECT * FROM user where user.email = '"+queryObj.email+"' and password = '"+queryObj.password+"'", function (error, results, fields){
	if (error) {
	console.log(error);
	connection_pool.end();
	}
	else {
		console.log("results: ", results);
		
		if (results.length == 0){
			connection_pool.end();
			console.log("Invalid Login");
			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.write("Invalid Login");
			res.end();
		}
		else{
			connection_pool.end();
			console.log("User Exists: ", results);
			res.writeHead(200, {"Content-Type" : "application/json"});
			res.write(JSON.stringify(results));
			res.end();		
		}
	}
	});
	
}



function handleRegistration(queryObj, res) {

	if (queryObj.email == "" || queryObj.username == "" || queryObj.password == ""){
		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.write("Input field(s) are empty");
		res.end();
	}
	else{
		let connection_pool = mysql.createPool(connectionObj);
		connection_pool.query("INSERT INTO user(username, password, email) values ('"+queryObj.username+"','"+queryObj.password+"','"+queryObj.email+"')",
		function (error, results, fields) {
			if (error) {
				var code = error.code;
				if (code ==  'ER_DUP_ENTRY') {
					connection_pool.end()
					res.writeHead(200, {"Content-Type" : "text/plain"});
					res.write("Email already registered.");
					res.end();
				}
			}
			else{
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.write("You signed up successfully.");
				connection_pool.end();
				res.end();
			}
			});
		}
}

function create_forum_post(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	console.log(`INSERT INTO forums(title, description, email) VALUES ('${queryObj.title}', '${queryObj.description}', '${queryObj.email}')`);
	connection_pool.query(`INSERT INTO forums(title, description, email) VALUES ('${queryObj.title}', '${queryObj.description}', '${queryObj.email}')`,
	function (error, results, fields) {
		if (error) {
			console.log(error);
			res.end();
			connection_pool.end();
		}
		else{
			connection_pool.end();
			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.write("Successfully created forum.");
			res.end();
		}
	})
}

function get_forum_posts(queryObj, res) {
	let connection_pool = mysql.createPool(connectionObj);

	connection_pool.query("SELECT title FROM forums ORDER BY RAND() LIMIT 5;", function(error, results, fields) {
		if(error){
			console.log(error);
			connection_pool.end();
			res.end();
		}
		else{
			connection_pool.end();
			res.writeHead(200, {"Content-Type" : "application/json"});
			res.write(JSON.stringify(results));
			res.end();
		}

	})}


function handle_incoming_request(req, res){
	console.log(req.url);
	const path = url.parse(req.url).pathname;
	const queryObj = url.parse(req.url, "true").query;

	switch(path){
		case "/index.html":
			writeOut(path, res);
			break;
		case "/login.html":
			writeOut(path, res);
			break;
		case "/signup.html":
			writeOut(path, res);
			break;
		case "/vehicleBuilder.html":
			writeOut(path, res);
			break;
		case "Forums.html":
			writeOut(path, res);
			break;
		case "profile.html":
			writeOut(path,res);
			break;
		case "/login":
			handleLogin(queryObj, res);
			break;
		case "/":
			writeOut("/index.html", res);
			break;
		case "/signup":
			handleRegistration(queryObj, res);
			break;
		case "/post.html":
			writeOut(path, res);
			break;
		case "/forum_post":
			create_forum_post(queryObj, res);
			break;
		case "/get_forum_posts":
			get_forum_posts(queryObj, res);
			break;
		default:
			writeOut(path, res);
			break;
	}
}



const server = http.createServer(handle_incoming_request);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
