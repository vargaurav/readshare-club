'use strict';

var Logger = require('../lib/logger');
var env = process.env.NODE_ENV || 'local';

module.exports = function(err, req, res, next) {
    let code = err.status || 500;

    if (err.code === 'NO_CONTENT') {
        return res.status(200).json({
            message: 'NO CONTENT',
            association: false
        });
    }
    let response = { error: err.message || err, 
                     stack: err.stack ? err.stack.split('\n') : '' 
                    };

    if (err.data) {
        response.data = err.data;
    }
    if (err.url) {
        response.url = err.url;
    }
    if (err.code) {
        response.code = err.code;
    }

    if (code >= 500) {
        Logger.error(err.stack);
    }

    if (env.toLowerCase() === 'production') {
        if (code === 500) {
            response.error = 'An unexpected error has occured';
        }
        response.stack = undefined;
    }

    if (response.message && (response.message.indexOf('MMTC_') > -1 || response.message.indexOf('BI_') > -1)) {
        response.message = 'Something went wrong. Please try again later.';
    }

    if (response.error && (response.error.indexOf('MMTC_') > -1 || response.error.indexOf('BI_') > -1)) {
        response.error = 'Something went wrong. Please try again later.';
    }

    return res.status(code).json(response);
};