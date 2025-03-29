use ragebuilt;

SELECT user.username, forums.email FROM user JOIN forums ON user.email=forums.email;
