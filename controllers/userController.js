const { updateUser, findUserById } = require("../models/userModel");
const { getError } = require("../utils/errorHandler");

exports.updateProfile = (req, res) => {
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.email) updates.email = req.body.email;

  updateUser(req.user.id, updates, (err) => {
    if (err)
      return res.status(500).json({ error: getError("PROFILE_UPDATE_FAILED") });

    res.json({ message: "Profile updated" });
  });
};


exports.updateIP = (req, res) => {
  const newIp = req.ip;

  updateUser(req.user.id, { whitelisted_ip: newIp }, (err) => {
    if (err)
      return res.status(500).json({ error: getError("IP_UPDATE_FAILED") });

    res.json({ message: "IP updated" });
  });
};

