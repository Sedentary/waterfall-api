'use strict';

const UserService = require('../services/user');

module.exports = {
    list: (req, res) => {
        UserService.list((err, users) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(users);
        });
    },

    create: (req, res) => {
        UserService.create(req.body, (err, user) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(user);
        });
    },

    get: (req, res) => {
        UserService.get(req.params.id, (err, user) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(user);
        });
    },

    update: (req, res) => {
        UserService.update(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(data);
        });
    },

    delete: (req, res) => {
        UserService.delete(req.params.id, (err) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200);
        });
    }
};