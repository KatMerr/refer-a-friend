const ProductModel = require('../models/product');

exports.allProducts = function(req, res){
    ProductModel.
        find().
        sort({"name": 1}).
        exec((err, products) => {
            if (err) return res.status(500).send(err);
            res.json(products);
        });
}