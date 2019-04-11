const UserReferal = require('../models/user-referal');

exports.getReferalsForProduct = function (req, res){
    const productID = req.params.productID;
    if (productID){
        UserReferal
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
    UserReferal
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
    UserReferal
        .findOneAndUpdate(query, doc)
        .then((updatedDoc) => {
            res.json(updatedDoc);
        });
}

exports.addReferal = function(req, res){
    const { productID, name, referalAmount, referalIdentifier, preferred } = req.body;
    
    const newReferal = new UserReferal();
    newReferal.name = name;
    newReferal.product = productID;
    newReferal.referalAmount = referalAmount;
    newReferal.referalIdentifier = referalIdentifier;
    newReferal.preferred = preferred;

    newReferal.save((err, addedReferal) => {
        if (err) return res.status(500).send(err);
        res.json(addedReferal);
    });
}