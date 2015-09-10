'use strict';

const userModel = require('../models/user');

module.exports = {

    /**
     *
     * @param pagination
     * @param cb
     */
    list: (pagination, cb) => {
        if (typeof pagination !== 'object') {
            pagination = {};
        }

        userModel.find({})
            .sort(pagination.sort || {})
            .skip(pagination.skip || 0)
            .limit(pagination.limit || 100)
            .exec((err, users) => {
                if (err) {
                    return cb(err);
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
        userModel.findOne({email: params.email}, (err, user) => {
            if (err) {
                return cb({status: 500, cause: 'Error querying for user'});
            }
            if (user) {
                return cb({status: 400, cause: 'An user with same email already exists'});
            }

            let model = {
                email: params.email,
                name: params.name
            };

            userModel.create(model, (err, user) => {
                if (err) {
                    return cb({status: 500, cause: 'Error creating user'});
                }

                cb(null, user);
            });
        });
    },

    /**
     *
     * @param id
     * @param cb
     */
    get: (id, cb) => {
        userModel.findById(id, (err, user) => {
            if (err) {
                return cb({status: 500, cause: 'Error querying for user'});
            }
            if (!user) {
                return cb({status: 404, cause: 'User not found'});
            }

            cb(null, user);
        });
    },

    /**
     *
     * @param id
     * @param params
     * @param cb
     */
    update: (id, params, cb) => {
        userModel.findById(id, (err, user) => {
            if (err) {
                return cb({status: 500, cause: 'Error querying for user'});
            }
            if (!user) {
                return cb({status: 404, cause: 'User not found'});
            }

            let model = {
                name: params.name,
                email: params.email
            };

            userModel.update({_id: id}, {$set: model}, (err, user) => {
                if (err) {
                    return cb({status: 500, cause: 'Error updating user'});
                }

                cb(null, user);
            });
        });
    },

    /**
     *
     * @param id
     * @param cb
     */
    delete: (id, cb) => {
        userModel.findById(id, (err, user) => {
            if (err) {
                return cb({status: 500, cause: 'Error querying for user'});
            }
            if (!user) {
                return cb({status: 404, cause: 'User not found'});
            }

            user.remove((err) => {
                if (err) {
                    return cb({status: 500, cause: 'Error deleting user'});
                }

                cb();
            });
        });
    }
};