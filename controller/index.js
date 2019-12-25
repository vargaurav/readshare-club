'use strict';

var
    Q = require('q'),
    _ = require('lodash'),
    UTIL = require('util'),
    mysqlClinet = require('../lib/mysqlConnection'),
    testController = require('../controller/testController'),
    USER_CONTROLLER = require('../controller/userController'),
    BOOK_CONTROLLER = require('../controller/bookController'),
    ESSAY_CONTROLLER = require('../controller/essayController'),
    PODCAST_CONTROLLER = require('../controller/podcastController'),
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
        .then(function(con){
            Logger.info(`Test controller initialised`);
            Logger.info(`Initiating User Controller`);
            self.USER_CONTROLLER = new USER_CONTROLLER(opts,self);
            return self.USER_CONTROLLER.init(opts);
        })
        .then(function(con){
            Logger.info(`User controller initialised`);
            Logger.info(`Initiating Book Controller`);
            self.BOOK_CONTROLLER = new BOOK_CONTROLLER(opts,self);
            return self.USER_CONTROLLER.init(opts);
        })
        .then(function(con){
            Logger.info(`Book controller initialised`);
            Logger.info(`Initiating essay Controller`);
            self.ESSAY_CONTROLLER = new ESSAY_CONTROLLER(opts,self);
            return self.ESSAY_CONTROLLER.init(opts);
        })
        .then(function(con){
            Logger.info(`Essay controller initialised`);
            Logger.info(`Initiating podcast Controller`);
            self.PODCAST_CONTROLLER = new PODCAST_CONTROLLER(opts,self);
            return self.PODCAST_CONTROLLER.init(opts);
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