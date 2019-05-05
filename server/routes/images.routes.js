const Router = require('express').Router;
const imagesController = require('../controllers/images.controller')

const router = new Router();

router.route('/')
      .post(imagesController.addImage);

router.route('/:publicID')
      .delete(imagesController.deleteImage);

module.exports = router;