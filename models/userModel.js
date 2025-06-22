const db = require("../config/db");

exports.createUser = (user, callback) => {
  const query = "INSERT INTO users SET ?";
  db.query(query, user, callback);
};

exports.findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

exports.findUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

exports.updateUser = (id, updates, callback) => {
  db.query("UPDATE users SET ? WHERE id = ?", [updates, id], callback);
};
