const jwt = require("jsonwebtoken");
const { users } = require("../models");
const secretKey = process.env.SECRET_KEY;

module.exports = async function (req, res, next) {
  try {
    // check jika request header authorization ada atau gak
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: "failed",
        message: "Token Gak ada/authorization nya gak ada",
      });
    }

    const token = req.headers.authorization;
    // req.headers.authorization => bearer authentication

    // jwt verifikasi tokennya
    const payload = jwt.verify(token, secretKey);
    console.log(payload);

    const user = await users.findByPk(payload.id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
