'use strict';

const userModel = require('../models/user');

module.exports = {
    list: cb => {
        userModel.find({}, (err, users) => {
            if (err) {
                return cb(err);
            }

            cb(null, users);
        });
    },

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
    }
};