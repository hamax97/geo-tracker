DROP TABLE IF EXISTS user;

CREATE TABLE user (
  usr_id INTEGER PRIMARY KEY AUTOINCREMENT,
  usr_name TEXT NOT NULL,
  usr_password TEXT NOT NULL
);

DROP TABLE IF EXISTS route;

CREATE TABLE route (
  route_id INTEGER PRIMARY KEY AUTOINCREMENT,
  points BLOB,
  usr_id INTEGER,
  FOREIGN KEY(usr_id) REFERENCES user(usr_id)
);
