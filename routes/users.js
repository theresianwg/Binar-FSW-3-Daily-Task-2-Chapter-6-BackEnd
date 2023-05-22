const router = require("express").Router();

const userController = require("../controller/userController");

router.post("/users/login", userController.login);

module.exports = router;
