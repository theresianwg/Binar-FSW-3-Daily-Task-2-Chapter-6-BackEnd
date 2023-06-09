const jwt = require('jsonwebtoken');
const { users } = require('../models');

module.exports = async function (req, res, next) {
    try {
        // check jika request header authorization ada atau gak
        console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: "failed",
                message: "Token Gak ada/authorization nya gak ada"

            })
        }

        const bearerToken = req.headers.authorization
        // req.headers.authorization => bearer authentication

        const token = bearerToken.split('Bearer ')[1]

        // jwt verifikasi tokennya 
        const secretKey = process.env.SECRET_KEY;
        const payload = jwt.verify(token, secretKey)
        console.log(payload)

        const user = await users.findByPk(payload.id)
        req.user = user
        next();
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}