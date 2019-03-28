const UserReferalModel = require('../models/user-referal');

exports.getReferalsForProduct = function (req, res){
    const productID = req.params.productID;
    if (productID){
        UserReferalModel
        .find({product: productID})
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

exports.updateSingleReferal = function (req, res){
    const doc = req.body;
    const { productID, referalID } = req.params;
    const query = {
        product: productID,
        _id: referalID
    };
    UserReferalModel
        .findOneAndUpdate(query, doc)
        .then((updatedDoc) => {
            res.json(updatedDoc);
        });
}

exports.postReferal = function(req, res){
    const { } = req.body;
    
}