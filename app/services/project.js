'use strict';

const ProjectModel = require('../models/project');
const ListModel = require('../models/list');
const CardModel = require('../models/card');
const LabelModel = require('../models/label');

module.exports = {

    /**
     *
     * @param cb
     */
    list: (cb) => {
        ProjectModel
            .find({})
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
        let project = new ProjectModel();
        project.name = params.name;
        project.private = params.private;
        if (params.users) {
            project.users = Array.isArray(params.users) ? params.users : params.users.split(',');
        }
        project.lists = [];

        project.save((err) => {
            if (err) {
                console.log(err);
                return cb({status: 500, message: `Error creating: ${err.message}`});
            }

            cb(null, project);
        });
    },

    /**
     *
     * @param id
     * @param cb
     */
    get: (id, cb) => {
        ProjectModel.findById(id, (err, data) => {
            if (err) {
                return cb({status: 500, message: `Error querying: ${err.message}`});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }
            cb(null, data);
        });
    },

    /**
     *
     * @param id
     * @param params
     * @param cb
     */
    update: (id, params, cb) => {
        ProjectModel.findById(id, (err, data) => {
            if (err) {
                return cb({status: 500, message: `Error updating: ${err.message}`});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }

            let model = {};
            model.name = params.name;
            model.private = params.private;
            if (params.users) { model.users = Array.isArray(params.users) ? params.users : params.users.split(','); }
            if (params.lists) { model.lists = Array.isArray(params.lists) ? params.lists : params.lists.split(','); }

            ProjectModel.update({ _id: id }, { $set: model }, (err, data) => {
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
        ProjectModel.findById(id, (err, data) => {
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

                ListModel.remove({ project: id });
                CardModel.remove({ project: id });
                LabelModel.remove({ project: id });
            });
        });
    }
};