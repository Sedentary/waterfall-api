'use strict';

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    return res.status(200).json({message: 'ok'});
});

module.exports = router;
