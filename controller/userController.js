const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// validasi done
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // cari user berdasarkan username
    const user = await users.findOne({
      where: {
        username,
      },
    });

    // validasi kalau user nya gk ada
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: `user ${username} tidak ditemukan`,
      });
    }

    // check password dari request body sesuai gak sama hashed password dari database
    if (user && bcrypt.compareSync(password, user.password)) {
      // generate TOKEN utk user
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        "rahasia"
      );

      res.status(200).json({
        status: "success",
        data: {
          user,
          token,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

module.exports = {
  login,
};
