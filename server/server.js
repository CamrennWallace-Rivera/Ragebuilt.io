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

function save_img_user_table(queryObj, res, filepath){
	let connection_pool = mysql.createPool(connectionObj);
	connection_pool.query(`UPDATE user SET profile_desc='${queryObj.description[0]}', profile_pic='${filepath}' WHERE email='${queryObj.email[0]}'`,
		function(error, results, fields){
			if(error){
				console.log(error);
				connection_pool.end();
				res.end();
			}
			else{
				connection_pool.end();
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.write("Successfully updated description / filepath!");
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

function update_profile_page(req, res){
	var form = new formidable.IncomingForm();
       	form.parse(req, function(err, fields, files) {
		if(fields.photo_exists[0] == "true"){
		
			var oldpath ='' + files.filetoupload[0].filepath;
			console.log("oldpath: " + oldpath);
               		var newpath = '/home/splee6177/photos/' + files.filetoupload[0].originalFilename;
                	console.log("file path: " + newpath);
                	fs.rename(oldpath, newpath, function(e) {
                        	if(e) throw err;
                	})
			save_img_user_table(fields, res, newpath);
		}
		else{
			let connection_pool = mysql.createPool(connectionObj);
			connection_pool.query(`UPDATE user SET profile_desc='${fields.description[0]}' WHERE email='${fields.email[0]}'`,
				function(error, results, fields) {
					if(error){
						console.log(error);
						connection_pool.end();
						res.end();
					}
					else{
						connection_pool.end();
						res.writeHead(200, {"Content-Type" : "text/plain"});
						res.write("Only updated profile description.");
						res.end();
					}
				})
			
		}
        })
}

function sanitizeValue(val) {
	//This is so if an input field is left blank, we set it to null so the
	//database can handle it accordingly.
    return (val === "-----" || val === "" || val === undefined) ? null : val;
}


function submit_vb(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);

	let sql_query = `
	INSERT INTO vehicle_builds (
	    vb_name, vb_price, email, username, owner_comments, additional_specs,
	    brake_name, brake_price, brake_store,
	    muffler_name, muffler_price, muffler_store,
	    engine_name, engine_price, engine_store,
	    transmission_name, transmission_price, transmission_store,
	    clutch_name, clutch_price, clutch_store,
	    tire_name, tire_price, tire_store
	) VALUES (?, ?, ?, ?, ?, ?,
		   ?, ?, ?,
		   ?, ?, ?,
		   ?, ?, ?,
		   ?, ?, ?,
		   ?, ?, ?,
		   ?, ?, ?)`;

	let values = [
	    sanitizeValue(queryObj.vb_name),
	    sanitizeValue(queryObj.vehicle_price),
	    sanitizeValue(queryObj.email),
	    sanitizeValue(queryObj.username),
	    sanitizeValue(queryObj.owner_comments),
	    sanitizeValue(queryObj.additional_specs),
	    sanitizeValue(queryObj.brakes_name),
	    sanitizeValue(queryObj.brakes_price),
	    sanitizeValue(queryObj.brakes_store),
	    sanitizeValue(queryObj.muffler_name),
	    sanitizeValue(queryObj.muffler_price),
	    sanitizeValue(queryObj.muffler_store),
	    sanitizeValue(queryObj.engine_name),
	    sanitizeValue(queryObj.engine_price),
	    sanitizeValue(queryObj.engine_store),
	    sanitizeValue(queryObj.transmission_name),
	    sanitizeValue(queryObj.transmission_price),
	    sanitizeValue(queryObj.transmission_store),
	    sanitizeValue(queryObj.clutch_name),
	    sanitizeValue(queryObj.clutch_price),
	    sanitizeValue(queryObj.clutch_store),
	    sanitizeValue(queryObj.tires_name),
	    sanitizeValue(queryObj.tires_price),
	    sanitizeValue(queryObj.tires_store)
	];


	connection_pool.query(sql_query, values, (err, results) => {
	    if (err) {
		console.error("Error inserting into vehicle_builds:", err);
		connection_pool.end();
		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.write("Error inserting values into DB.");
		res.end();
	    } else {
		console.log("Insert successful:", results);
	        console.log("inserted id: " + results.insertId);
		connection_pool.end();
		res.writeHead(200, {"Content-Type" : "application/json"});
		res.write(JSON.stringify({vb_id : results.insertId}));
		res.end();
	    }
	});

	
}

function populate_vb(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	connection_pool.query(`SELECT * FROM vehicle_builds WHERE vb_id=${queryObj.vb_id};`, function(error, results, fields){
		if(error){
			console.log(error);
			connection_pool.end();
			res.end();
		}
		else{
			connection_pool.end();
			res.writeHead(200, {"Content-Type" : "application/json"});
			console.log("results: " + results);
			res.write(JSON.stringify(results));
			res.end();
		}
	})

}

function completed_builds(queryObj, res){
	let connection_pool = mysql.createPool(connectionObj);
	connection_pool.query(`SELECT vb_name, username, vb_price FROM vehicle_builds LIMIT 3`, function(error, results, fields) {
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
		case "/update_profile":
			update_profile_page(req, res);
			break;
		case "/submit-vb":
			submit_vb(queryObj, res);
			break;
		case "/populate_vb":
			populate_vb(queryObj, res);
			break;
		case "/completed_builds":
			completed_builds(queryObj, res);
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
