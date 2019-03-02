const ProductModel = require('../models/product');

exports.allProducts = function(req, res){
    ProductModel.find().exec((err, products) => {
        if (err) return res.status(500).send(err);
        res.json(products);
    });
}