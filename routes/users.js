'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  return res.status(200).json({ message: 'ok' });
});

module.exports = router;
