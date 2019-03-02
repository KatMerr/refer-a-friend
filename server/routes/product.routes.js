const Router = require('express').Router;
const ProductController = require('../controllers/product.controller');
const ProductModel = require('../models/product');

const router = new Router();

router.route("/products")
.get(ProductController.allProducts);

module.exports = router;