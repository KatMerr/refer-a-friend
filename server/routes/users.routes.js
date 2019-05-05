const UsersController = require('../controllers/users.controller');
const Router = require('express').Router;

const router = new Router();

router.route("/:email/:password")
      .get(UsersController.loginUser);

module.exports = router;