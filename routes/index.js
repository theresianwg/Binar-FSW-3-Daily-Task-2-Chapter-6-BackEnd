const router = require('express').Router();

// import package swagger 
const swaggerUi = require('swagger-ui-express');
// import file json
const swaggerDocument = require('../docs/swagger.json')

// middleware
const Auth = require('../middleware/auth');

// API docs => dokumentasi API
router.use('/api-docs', swaggerUi.serve)
router.use('/api-docs', swaggerUi.setup(swaggerDocument))

const User = require('./users');
const Product = require('./products');

router.use('/api/v1/users/', User);
router.use('/api/v1/products/', Product);

// Dashboard

module.exports = router