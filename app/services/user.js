'use strict';

const userModel = require('../models/user');

module.exports = {

    /**
     *
     * @param pagination
     * @param cb
     */
    list: (cb) => {
        userModel
            .find({})
            .exec((err, users) => {
                if (err) {
                    return cb({status: 500, message: 'Error listing users'});
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
                return cb({status: 500, message: 'Error querying for user'});
            }
            if (user) {
                return cb({status: 400, message: 'An user with same email already exists'});
            }

            let model = {
                email: params.email,
                name: params.name
            };

            userModel.create(model, (err, user) => {
                if (err) {
                    return cb({status: 500, message: 'Error creating user'});
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
                return cb({status: 500, message: 'Error querying for user'});
            }
            if (!user) {
                return cb({status: 404, message: 'User not found'});
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
                return cb({status: 500, message: 'Error querying for user'});
            }
            if (!user) {
                return cb({status: 404, message: 'User not found'});
            }

            let model = {
                name: params.name,
                email: params.email
            };

            userModel.update({ _id: id }, { $set: model }, (err, data) => {
                if (err) {
                    return cb({status: 500, message: 'Error updating user'});
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
        userModel.findById(id, (err, user) => {
            if (err) {
                return cb({status: 500, message: 'Error querying for user'});
            }
            if (!user) {
                return cb({status: 404, message: 'User not found'});
            }

            user.remove((err) => {
                if (err) {
                    return cb({status: 500, message: 'Error deleting user'});
                }

                cb();
            });
        });
    }
};