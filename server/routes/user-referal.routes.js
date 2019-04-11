const Router = require('express').Router;
const userReferalModel = require('../models/user-referal');
const userReferalController = require('../controllers/user-referal.controller');

const router = new Router();


router.route('/')
    .get(userReferalController.getAllReferals)
    .post(userReferalController.addReferal);

router.route('/:productID')
    .get(userReferalController.getReferalsForProduct);

router.route('/:productID/:referalID')
    .get()
    .post(userReferalController.updateSingleReferal);


module.exports = router;