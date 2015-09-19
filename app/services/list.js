'use strict';

const ListModel = require('../models/list');

module.exports = {

    /**
     *
     * @param project
     * @param cb
     */
    list: (project, cb) => {
        ListModel
            .find({
                project: project
            })
            .exec((err, result) => {
                if (err) {
                    return cb({status: 500, message: `Error listing: ${err.message}`});
                }

                cb(null, result);
            });
    },

    /**
     *
     * @param params
     * @param cb
     */
    create: (params, cb) => {
        let model = new ListModel();
        model.name = params.name;
        model.cards = [];
        model.project = params.project;

        model.save(err => {
            if (err) {
                return cb({status: 500, message: `Error creating: ${err.message}`});
            }

            cb(null, model);
        });
    },

    /**
     *
     * @param id
     * @param params
     * @param cb
     */
    update: (id, params, cb) => {
        ListModel.findById(id, (err, data) => {
            if (err) {
                return cb({status: 500, message: `Error querying: ${err.message}`});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }

            let model = {};
            model.name = params.name;
            if (params.cards) { model.cards = Array.isArray(params.cards) ? params.cards : params.cards.split(','); }

            ListModel.update({_id: id}, {$set: model}, (err, data) => {
                if (err) {
                    return cb({status: 500, message: `Error updating: ${err.message}`});
                }

                cb(null, data);
            });
        });
    },

    /**
     *
     * @param id
     * @param cb
     */
    delete: (id, cb) => {
        ListModel.findById(id, (err, data) => {
            if (err) {
                return cb({status: 500, message: `Error querying: ${err.message}`});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }

            data.remove(err => {
                if (err) {
                    return cb({status: 500, message: `Error deleting: ${err.message}`});
                }

                cb(null, {message: 'Deleted'});
            });
        });
    }
};