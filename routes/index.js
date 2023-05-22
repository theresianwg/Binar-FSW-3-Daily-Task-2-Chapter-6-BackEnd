const router = require("express").Router();

// import package swagger
// const swaggerUi = require("swagger-ui-express");
// import file json
// const swaggerDocument = require("../docs/swagger.json");

// middleware
const Auth = require('../middleware/auth');

// API docs => dokumentasi API
// router.use("/api-docs", swaggerUi.serve);
// router.use("/api-docs", swaggerUi.setup(swaggerDocument));

router.use(require("./products"));
router.use(require("./users"));

module.exports = router;
