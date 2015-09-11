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
            .exec((err, users) => {
                if (err) {
                    return cb({status: 500, message: 'Error listing'});
                }

                cb(null, users);
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
                return cb({status: 500, message: 'Error creating'});
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
                return cb({status: 500, message: 'Error querying'});
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
                return cb({status: 500, message: 'Error querying'});
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
                    return cb({status: 500, message: 'Error updating'});
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
                return cb({status: 500, message: 'Error querying'});
            }
            if (!data) {
                return cb({status: 404, message: 'Not found'});
            }

            data.remove((err) => {
                if (err) {
                    return cb({status: 500, message: 'Error deleting'});
                }

                cb(null, { message: 'Deleted' });

                ListModel.remove({ project: id });
                CardModel.remove({ project: id });
                LabelModel.remove({ project: id });
            });
        });
    }
};