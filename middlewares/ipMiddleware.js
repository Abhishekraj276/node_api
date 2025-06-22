const db = require("../config/db");

module.exports = (req, res, next) => {
  const userIp = req.ip;
  const userId = req.user.id;

  db.query("SELECT whitelisted_ip FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (result.length && result[0].whitelisted_ip === userIp) {
      next();
    } else {
      return res.status(403).json({ error: "IP not whitelisted" });
    }
  });
};
