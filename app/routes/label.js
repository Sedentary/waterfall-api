'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/label');

router
    .post('/', controller.create)
    .get('/:project_id', controller.list)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

module.exports = router;