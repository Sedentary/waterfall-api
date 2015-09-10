'use strict';

var express = require('express');
var router = express.Router();
var usersController = require('../controllers/user');

router
    .get('/', usersController.list)
    .post('/', usersController.create)
    .put('/:id', usersController.update);

module.exports = router;