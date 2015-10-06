'use strict';

const ProjectService = require('../services/project');

module.exports = {
    list: (req, res) => {
        ProjectService.list((err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    create: (req, res) => {
        console.log(req.body);
        ProjectService.create(req.body, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    get: (req, res) => {
        ProjectService.get(req.params.id, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    update: (req, res) => {
        ProjectService.update(req.params.id, req.body, (err, result) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).json(result);
        });
    },

    delete: (req, res) => {
        ProjectService.delete(req.params.id, (err, data) => {
            if (err) {
                return res.status(err.status).send(err.message);
            }

            res.status(200).send(data);
        });
    }
};