'use strict';

var
    Q = require('q'),
    _ = require('lodash'),
    UTIL = require('util'),
    Logger = null;

function controller(opts) {
    var self = this;
    Logger = opts.LOGGER || require('../lib/logger');
}

controller.prototype.init = function (opts, cb) {
    var self = this;

    if (typeof cb !== 'function') {
        cb = function () { };
    }

    Logger.info(`Starting the controller object with: ${UTIL.inspect(opts)}`);

    new Q(undefined)
        .then(function () {
            Logger.info(`Init all dependencies`);
            return cb();
        })
        .fail(function (err) {
            Logger.error(`Failed to init controller: ${UTIL.inspect(err)}`);
            return cb(err);
        });
};

module.exports = controller;