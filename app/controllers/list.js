'use strict';

const Service = require('../services/label');

module.exports = {
    list: (req, res) => {
        Service.list(req.params.project_id, (err, result) => {
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