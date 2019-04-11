const Router = require('express').Router;
const ProductController = require('../controllers/product.controller');

const router = new Router();

router.route("/")
.get(ProductController.allProducts)
.post(ProductController.addProduct);

router.route("/:productName")
.get(ProductController.oneProduct);

router.route("/:productName/:companyName")
.get(ProductController.oneProduct);

module.exports = router;