const UserReferalModel = require('../models/user-referal');

exports.getReferalsForProduct = function (req, res){
    const product_id = req.params.productID;
    if (product_id){
        UserReferalModel
        .find({product: product_id})
        .exec((err, referals) => {
            if (err) return res.send(500).send(err);
            res.json(referals);
        });
    } else {
        res.send(500).send("No Product ID Supplied");
    }
}

exports.getAllReferals = function (req, res){
    UserReferalModel
        .find()
        .exec((err, referals) => {
            if (err) return res.send(500).send(err);
            res.json(referals)
        });
}

exports.postReferal = function(req, res){
    const { } = req.body;
    
}