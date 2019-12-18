'use strict';

var
    Q = require('q'),
    _ = require('lodash'),
    UTIL = require('util'),
    mysqlClinet = require('../lib/mysqlConnection'),
    testController = require('../controller/testController'),
    Logger = null;

function controller(opts) {
    let self = this;
    Logger = opts.LOGGER || require('../lib/logger');
}

controller.prototype.init = function (opts, cb) {
    let self = this;

    if (typeof cb !== 'function') {
        cb = function () { };
    }

    Logger.info(`Starting the controller object with: ${UTIL.inspect(opts)}`);

    new Q(undefined)
        .then(function(){
            return mysqlClinet.init();
        })
        .then(function(con){
            Logger.info(`Set mysql in controller object`);
            self.DB_INSTANCE = con;
            Logger.info(`Initiating test controller`);
            self.TEST_CONTROLLER = new testController(opts,self);
            return self.TEST_CONTROLLER.init(opts);
        })
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