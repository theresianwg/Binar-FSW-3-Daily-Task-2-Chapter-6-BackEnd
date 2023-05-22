const router = require("express").Router();
const Auth = require("../middleware/auth");
const productController = require("../controller/productController");
const upload = require("../middleware/uploader");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", upload, Auth, productController.editProduct);
router.delete("/products/:id", Auth, productController.deleteProduct);
router.post("/products", upload, Auth, productController.createProduct);

module.exports = router;
