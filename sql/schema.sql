USE ragebuilt;

CREATE TABLE IF NOT EXISTS user(
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	profile_desc VARCHAR(1000) DEFAULT "No Description.",
	PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS forums(
	forum_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(500), 
	email VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (forum_id),
	FOREIGN KEY (email) REFERENCES user(email)
);

CREATE TABLE IF NOT EXISTS comments(
	comment_id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	forum_id INT NOT NULL, 
	comment_desc VARCHAR(500) NOT NULL,
	comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (comment_id),
	FOREIGN KEY (email) REFERENCES user(email),
	FOREIGN KEY (forum_id) REFERENCES forums(forum_id)
);

CREATE TABLE IF NOT EXISTS vehicle_builds(
	vb_id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	vb_name VARCHAR(255) NOT NULL DEFAULT "No Name",
	vb_price FLOAT NOT NULL,
	owner_comments VARCHAR(500) DEFAULT "No Owner Comment",
	additional_specs VARCHAR(500) DEFAULT "None",
	engine_name VARCHAR(255) DEFAULT "N/A",
	engine_price VARCHAR(255) DEFAULT "N/A",
	engine_store VARCHAR(255) DEFAULT "N/A",
	transmission_name VARCHAR(255) DEFAULT "N/A",
	transmission_price VARCHAR(255) DEFAULT "N/A",
	transmission_store VARCHAR(255) DEFAULT "N/A",
	clutch_name VARCHAR(255) DEFAULT "N/A",
	clutch_price VARCHAR(255) DEFAULT "N/A",
	clutch_store VARCHAR(255) DEFAULT "N/A",
	tire_name VARCHAR(255) DEFAULT "N/A",
	tire_price VARCHAR(255) DEFAULT "N/A",
	tire_store VARCHAR(255) DEFAULT "N/A",
	brake_name VARCHAR(255) DEFAULT "N/A",
	brake_price VARCHAR(255) DEFAULT "N/A",
	brake_store VARCHAR(255) DEFAULT "N/A",
	muffler_name VARCHAR(255) DEFAULT "N/A",
	muffler_price VARCHAR(255) DEFAULT "N/A",
	muffler_store VARCHAR(255) DEFAULT "N/A",
	PRIMARY KEY (vb_id),
	FOREIGN KEY (email) REFERENCES user(email)
);
