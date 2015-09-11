'use strict';

const Service = require('../services/project');

module.exports = {
    list: (req, res) => {
        Service.list((err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    create: (req, res) => {
        Service.create(req.body, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    get: (req, res) => {
        Service.get(req.params.id, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    update: (req, res) => {
        Service.update(req.params.id, req.body, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    delete: (req, res) => {
        Service.delete(req.params.id, (err, data) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).send(data);
        });
    }
};