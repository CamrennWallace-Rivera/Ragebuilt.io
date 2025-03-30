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
