const Product = require('../models/product');


exports.addProduct = function(req, res){
    const { cardDetails, name, company, tags, referalIdentifier, usesCode } = req.body;

    const newProduct = new Product();
    newProduct.cardDetails = cardDetails;
    newProduct.name = name;
    newProduct.company = company;
    newProduct.tags = tags;
    newProduct.referalIdentifier = referalIdentifier;
    newProduct.usesCode = usesCode;
    newProduct.pending = true;

    newProduct.save((err, addedProduct) => {
        if (err) return res.status(500).send(err);
        res.json(addedProduct);
    });
}

exports.allProducts = function(req, res){
    Product.
    find().
    sort({"name": 1}).
    exec((err, products) => {
        if (err) return res.status(500).send(err);
        res.json(products);
    });
}

exports.oneProduct = function(req, res){
    const { productName, companyName } = req.params;
    const query = (!companyName) ? 
        {
            "name": productName
        }
        : {
            "name": productName,
            "company": companyName
        }
    console.log(query);
    Product
    .findOne(query)
    .exec((err, product) => {
        if (err) return res.status(500).send(err);
        res.json(product);
    });
}