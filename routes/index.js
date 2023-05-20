const router = require('express').Router();

// import package swagger 
const swaggerUi = require('swagger-ui-express');
// import file json
const swaggerDocument = require('../docs/swagger.json')

// const productController = require('../controller/productController');
// const shopController = require('../controller/shopController');

// middleware
const Auth = require('../middleware/auth');
// const checkRole = require('../middleware/checkRole');

// API docs => dokumentasi API
router.use('/api-docs', swaggerUi.serve)
router.use('/api-docs', swaggerUi.setup(swaggerDocument))

// const Admin = require('./admin');
const User = require('./users');
// const Shop = require('./shops');
// const Product = require('./products');
 
// router.use('/api/v1/admin/', Admin);
router.use('/api/v1/users/', User);
// router.use('/api/v1/shops/', Shop);
// router.use('/api/v1/products/', Product);

// Dashboard

module.exports = router