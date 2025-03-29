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
	PRIMARY KEY (forum_id),
	FOREIGN KEY (email) REFERENCES user(email)
);
