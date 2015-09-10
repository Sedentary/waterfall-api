'use strict';

var userModel = require('../models/user');

module.exports = {
    list: function (cb) {
        userModel
            .find({})
            .exec(function (err, users) {
                if (err) {
                    return cb(err);
                }

                cb(null, users);
            });
    },
    create: function (params, cb) {
        userModel.findOne({id: params.id}, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (user) {
                return cb(null, user);
            }

            let model = {
                email: params.email,
                name: params.name
            };

            userModel.create(model, function (err, user) {
                if (err) {
                    return cb(err);
                }

                cb(null, user);
            });
        });
    },
    update: function (id, params, cb) {
        userModel.findById(id)
            .exec(function (err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    return cb();
                }

                let model = {
                    name: params.name,
                    email: params.email
                };

                userModel.update({_id: id}, {$set: model}, function (err, user) {
                    if (err) {
                        return cb(err);
                    }

                    cb(null, user);
                });
            });
    }
};