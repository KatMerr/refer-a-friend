const Router = require('express').Router;
const ProductController = require('../controllers/product.controller');

const router = new Router();

router.route("/")
.get(ProductController.getAllProducts)
.post(ProductController.addProduct);

router.route("/:productID")
.get(ProductController.getProductByID)
//ADD DELETE FUNCTION
.delete();

router.route("/:productName/:companyName")
.get(ProductController.getProductByName);

module.exports = router;