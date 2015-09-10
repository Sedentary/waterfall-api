'use strict';

var userService = require('../services/user');

exports.list = function (req, res, next) {
    userService.list(function (err, users) {
        if (err) {
            return next(err);
        }

        res.status(200).json(users);
    });
};

exports.create = function (req, res, next) {
    userService.create(req.body, function (err, user) {
        if (err) {
            return next(err);
        }

        res.status(200).json(user);
    });
};

exports.update = function (req, res, next) {
    userService.update(req.params.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    });
};