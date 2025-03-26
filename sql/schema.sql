USE ragebuilt;

CREATE TABLE IF NOT EXISTS user(
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	profile_desc VARCHAR(1000) DEFAULT "No Description.",
	PRIMARY KEY (email)
);
