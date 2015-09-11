'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/project');

router
    .get('/', controller.list)
    .post('/', controller.create)
    .get('/:id', controller.get)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

module.exports = router;