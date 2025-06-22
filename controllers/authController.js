const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const generateUserId = require("../utils/generateUserId");
const { getError } = require("../utils/errorHandler");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const whitelisted_ip = req.ip;

  findUserByEmail(email, async (err, users) => {
    if (err) return res.status(500).json({ error: getError("SERVER_ERROR") });

    if (users.length)
      return res.status(400).json({ error: getError("EMAIL_EXISTS") });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        user_id: generateUserId(),
        whitelisted_ip,
      };

      createUser(newUser, (err) => {
        if (err)
          return res
            .status(500)
            .json({ error: getError("USER_CREATION_FAILED") });

        res.status(201).json({ message: "User registered" });
      });
    } catch (hashErr) {
      return res.status(500).json({ error: getError("HASH_FAILED") });
    }
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, users) => {
    if (err) return res.status(500).json({ error: getError("SERVER_ERROR") });
    if (!users.length)
      return res.status(404).json({ error: getError("USER_NOT_FOUND") });

    const user = users[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: getError("INVALID_CREDENTIALS") });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      delete user.password;

      res.status(200).json({
        message: "Login successful",
        token,
        user,
      });
    } catch (err) {
      res.status(500).json({ error: getError("SERVER_ERROR") });
    }
  });
};


