'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router
    .get('/', usersController.list)
    .post('/', usersController.create)
    .put('/:id', usersController.update);

module.exports = router;