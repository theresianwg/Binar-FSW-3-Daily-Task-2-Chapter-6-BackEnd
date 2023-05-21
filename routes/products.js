const router = require('express').Router();
// const Auth = require('../middleware/auth');
const productController = require('../controller/productController');


// users
// router.get('/', Auth, productController.getProducts)
// router.get('/search', Auth, productController.searchProduct)
// router.get('/:id',Auth, productController.getProductById)
// router.put('/:id', Auth, productController.editProduct)
// router.delete('/:id', Auth, productController.deleteProduct)
// router.post('/', Auth, productController.createProduct)

router.get('/', productController.getProducts)
router.get('/search', productController.searchProduct)
router.get('/:id', productController.getProductById)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)
router.post('/', productController.createProduct)

module.exports = router