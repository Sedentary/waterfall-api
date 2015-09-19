'use strict';

const LabelService = require('../services/label');

module.exports = {
    list: (req, res) => {
        LabelService.list(req.params.project_id, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    create: (req, res) => {
        LabelService.create(req.body, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    update: (req, res) => {
        LabelService.update(req.params.id, req.body, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    delete: (req, res) => {
        LabelService.delete(req.params.id, (err, data) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).send(data);
        });
    }
};