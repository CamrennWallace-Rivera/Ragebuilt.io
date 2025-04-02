// server.js

const http = require("http");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const hostname = '0.0.0.0';
const port = 80;
const url = require('url');
const formidable = require('formidable');

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
	const filePath = fileNamePath.includes("splee6177") ? fileNamePath : "public" + fileNamePath;

        fs.readFile(filePath, function(err,content){
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
		
		if (results.length == 0){
			connection_pool.end();
			console.log("Invalid Login");
			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.write("Invalid Login");
			res.end();
		}
		else{
			connection_pool.end();
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
	console.log("queryObj.filepath: " +  queryObj.filepath);
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

	connection_pool.query("SELECT forums.title, user.username, forums.created_at, forums.forum_id FROM user JOIN forums ON user.email=forums.email ORDER BY forums.title DESC;", function(error, results, fields) {
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

function display_forum_page(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);

	connection_pool.query(`SELECT forums.title, forums.description, forums.created_at, forums.filepath, user.username FROM user JOIN forums ON user.email=forums.email WHERE forums.forum_id = ${queryObj.forum_id};`, function(error, results, fields){
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
	})
}

function display_comments(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	let sql_query = `select comments.comment_desc, comments.comment_date, user.username FROM user JOIN comments ON user.email=comments.email WHERE comments.forum_id = ${queryObj.forum_id};`;
	connection_pool.query(sql_query, function(error, results, fields){
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
	})
}

function add_comments(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	let sql_query = `INSERT INTO comments(email, comment_desc, forum_id) VALUES ("${queryObj.email}", "${queryObj.comment_desc}", ${queryObj.forum_id})`;
	connection_pool.query(sql_query, function(error, results, fields){
		if(error){
			console.log(error);
			connection_pool.end();
			res.end();
		}
		else{
			connection_pool.end();
			return_single_comment(queryObj, res);
		}
	})
}

function return_single_comment(queryObj, res){
	let connection_pool2 = mysql.createPool(connectionObj);
	let sql_query2 = `SELECT user.username, comments.comment_desc, comments.comment_date FROM user JOIN comments ON user.email=comments.email WHERE comments.forum_id = ${queryObj.forum_id}`;
	connection_pool2.query(sql_query2, function(error, results, fields){
		if(error){
			console.log(error);
			connection_pool2.end();
			res.end();
		}
		else{
			connection_pool2.end();
			res.writeHead(200, {"Content-Type" : "application/json"});
			res.write(JSON.stringify(results));
			res.end();
		}
	})
}

function search_query(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	connection_pool.query(
	`SELECT forums.title, user.username, forums.created_at, forums.forum_id
   FROM user
   JOIN forums ON user.email = forums.email
   WHERE forums.title LIKE CONCAT('%', ?, '%');`,
  [queryObj.search_query], function(error, results, fields){
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
	})
}

function upload_img(req, res){
	var form = new formidable.IncomingForm();	
	form.parse(req, function(err, fields, files) {
		var oldpath = files.filetoupload[0].filepath;
		var newpath = '/home/splee6177/photos/' + files.filetoupload[0].originalFilename;
		console.log("file path: " + newpath);
		fs.rename(oldpath, newpath, function(e) {
			if(e) throw err;		
		})
		post_save_img(fields, res, newpath);
	})
}

function post_save_img(queryObj, res, filepath){
	let connection_pool = mysql.createPool(connectionObj);
	console.log("in post_save_img function.");
	connection_pool.query(`INSERT INTO forums(title, description, email, filepath) VALUES ('${queryObj.title}', '${queryObj.content}', '${queryObj.email}', '${filepath}')`,
	function(error, results, fields){
		if(error){
			console.log(error);
			connection_pool.end();
			res.end();
		}
		else{
			connection_pool.end();
			res.write("Successful input filepath into database.")
			res.end();
		}
	})
}

function profile_page(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	connection_pool.query(`SELECT username, profile_pic, profile_desc FROM user WHERE email='${queryObj.email}'`, function(error, results, fields){
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
	})
}


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
		case "display_forum.html":
			writeOut(path, res);
			break;
		case "/forums_id":
			display_forum_page(queryObj, res);
			break;
		case "/comments":
			display_comments(queryObj, res);
			break;
		case "/add_comment":
			add_comments(queryObj, res);
			break;
		case "/search_forum":
			search_query(queryObj, res);
			break;
		case "/fileupload":
			upload_img(req, res);
			break;
		case "/request_profile":
			profile_page(queryObj, res);
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
