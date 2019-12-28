'use strict';

if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

var PROGRAM = require('commander');
/*
    Command Line arguments
*/
PROGRAM.option('-v, --verbose', 'Enable verbose logging')
    .option('-d, --digitalmarketplace', 'Fulfillment Service for digital marketplace')
    .option('-rsa, --rsa [value]', 'Encryption File path for MF')
    .parse(process.argv);

var
    Q = require('q'),
    UTIL = require('util'),
    HTTP = require('http'),
    HTTPS = require('https'),
    EXPRESS = require('express'),
    _ = require('lodash'),
    BODYPARSER = require('body-parser'),
    LOGGER = require('./lib/logger'),
    ROUTES = require('./routes'),
    CONTROLLER = require('./controller'),
    UUID = require('uuid/v4'),
    cors = require('cors'),

    APP = EXPRESS(),
    PORT = _.get(process, 'env.PORT', 3001), //default port 3000
    CONTROLLER_OBJECT,
    INIT_OPTS = {};

_.set(HTTP, 'globalAgent.maxSockets', 1000);
_.set(HTTPS, 'globalAgent.maxSockets', 1000);

APP.use(BODYPARSER.json({
    limit: '10mb'
}));
APP.use(
    BODYPARSER.urlencoded({
        extended: true,
        limit: '10mb',
        parameterLimit: '5000'
    })
);

APP.use((req, res, next) => {
    req.uuid = _.get(req, 'headers.uniquenginxid') || UUID();
    return next();
});

var whitelist = ['*', 'http://localhost:3001'];
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  }
}

APP.use(cors(corsOptions));

process.on('uncaughtException', (error) => {
    LOGGER.error(`Uncaught Exception: Please take action immediately : ${UTIL.inspect(error)}`);
});

process.on('unhandledRejection', (reason) => {
    LOGGER.error(`Uncaught Rejection: Please take action immediately : ${UTIL.inspect(reason)}`);
});

new Q(undefined)
    .then(function () {
        return new Q();
    })
    .then(function () {
        LOGGER.info('Loading init options');
        return loadInitOptions();
    })
    .then(function () {
        LOGGER.info('Creating controller');
        CONTROLLER_OBJECT = new CONTROLLER(INIT_OPTS);
        return new Q();
    })
    .then(function () {
        LOGGER.info('Initiating controller');
        return initController();
    })
    .then(function () {
        LOGGER.info('Loading express routes');
        ROUTES(APP, CONTROLLER_OBJECT);
        return new Q();
    })
    .fail(function (error) {
        LOGGER.error(`Error in inti controller ${UTIL.inspect(error)}`);
        process.exit(1);
    });

// Load App init options
function loadInitOptions() {
    LOGGER.info('Populating INIT_OPTS');
    _.set(INIT_OPTS, 'LOGGER', LOGGER);
    _.set(INIT_OPTS, 'PROGRAM_OPTS', PROGRAM);
    return new Q();
}

// Init Controller
function initController() {
    let deferred = Q.defer();
        LOGGER.info('Initializing controller');

        CONTROLLER_OBJECT.init(INIT_OPTS, function (err, resp) {
            if (err) {
                LOGGER.error(`Failed to initialize Controller: ${UTIL.inspect(err)}`);
                return deferred.reject(err)
            }

            LOGGER.info('creating the web server');
            HTTP.createServer(APP)
                .on('error', function (error) {
                    LOGGER.error(`Error in creating HTTP Server : ${UTIL.inspect(error)}`);
                    return deferred.reject(error)
                })
                .listen(PORT, function () {
                    LOGGER.info(`read share service listening on port - ${PORT}`);
                });

                return deferred.resolve();
        });
    return deferred.promise;
};
