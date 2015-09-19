'use strict';

const LabelModel = require('../models/label');

module.exports = {

    /**
     *
     * @param cb
     */
    list: (project, cb) => {
        LabelModel
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
        let model = new LabelModel();
        model.name = params.name;
        model.color = params.color;
        model.project = params.project;

        model.save((err) => {
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
        LabelModel.findById(id, (err, data) => {
            if (err) {
                return cb({status: 500, message: `Error querying: ${err.message}`});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }

            let model = {};
            model.name = params.name;
            model.color = params.color;

            LabelModel.update({ _id: id }, { $set: model }, (err, data) => {
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
        LabelModel.findById(id, (err, data) => {
            if (err) {
                return cb({status: 500, message: `Error querying: ${err.message}`});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }

            data.remove((err) => {
                if (err) {
                    return cb({status: 500, message: `Error deleting: ${err.message}`});
                }

                cb(null, { message: 'Deleted' });
            });
        });
    }
};