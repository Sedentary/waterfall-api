'use strict';

const userService = require('../services/user');

module.exports = {
    list: (req, res) => {
        userService.list((err, users) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(users);
        });
    },

    create: (req, res) => {
        userService.create(req.body, (err, user) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(user);
        });
    },

    get: (req, res) => {
        userService.get(req.params.id, (err, user) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(user);
        });
    },

    update: (req, res) => {
        userService.update(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(data);
        });
    },

    delete: (req, res) => {
        userService.delete(req.params.id, (err) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200);
        });
    }
};