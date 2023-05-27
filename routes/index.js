const router = require("express").Router();

// import package swagger
const swaggerUi = require("swagger-ui-express");
// import file json
const swaggerDocument = require("../docs/swagger.json");

// API docs => dokumentasi API
router.use("/api-docs", swaggerUi.serve);
router.use("/api-docs", swaggerUi.setup(swaggerDocument));

router.use("/api/v1", require("./products"));
router.use("/api/v1", require("./users"));

module.exports = router;
