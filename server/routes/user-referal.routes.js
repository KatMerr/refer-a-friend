const Router = require('express').Router;
const userReferalModel = require('../models/user-referal');
const userReferalController = require('../controllers/user-referal.controller');

const router = new Router();


router.route('/')
    .get(userReferalController.getAllReferals)
    .post(userReferalController.addReferal);

router.route('/:referalID')
    .get(userReferalController.getSingleReferal)
    .post(userReferalController.updateSingleReferal);

router.route('/product/:productID')
    .get(userReferalController.getReferalsForProduct);


module.exports = router;