'use strict';

module.exports = (app) => {

    // routes
    const index = require('../app/routes/index');
    const user = require('../app/routes/user');
    const project = require('../app/routes/project');
    const label = require('../app/routes/label');

    app.use((req, res, next) => {
        // remove express http headers
        res.removeHeader('X-Powered-By');
        next();
    });

    // use routes
    app.use('/api/v1/index', index);
    app.use('/api/v1/user', user);
    app.use('/api/v1/project', project);
    app.use('/api/v1/label', label);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use((err, req, res) => {
            res.status(err.status || 500);
            return res.json({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res) => {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: {}
        });
    });

};