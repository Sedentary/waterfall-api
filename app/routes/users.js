'use strict';

let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router
    .get('/', usersController.list)
    .post('/', usersController.create)
    .put('/:id', usersController.update);

module.exports = router;