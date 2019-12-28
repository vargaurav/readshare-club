'use strict';

const _ = require('lodash');
const UTIL = require('util');
const boundMethod = require('../lib/util');
const CommonController = require('../controller/CommonController');
const ResponseController = require('../controller/ResponseController');
const ErrorController = require('../controller/ErrorController');
const apiSchema = require('../api-schema/user');
const bookApiSchema = require('../api-schema/book');
const essaySchema = require('../api-schema/essay');
const podcastApiSchema = require('../api-schema/podcast');

module.exports = function (app, controllerObject) {

    app.get(
        '/',
        (req, res, next) => res.end()
    );
    
    app.get(
        '/status',
        function(req, res, next) {
            console.log(controllerObject);
        },
        (req, res, next) => res.sendStatus(200)
    );

    app.get(
        '/_status',
        (req, res, next) => res.status(200).json({})
    );

    app.get(
        '/v1/readshare',
        CommonController.apiNoLongerSupported
    );

    app.get(
        '/v1/gettestdata',
        CommonController.setCorsHeaders,
        boundMethod(controllerObject.TEST_CONTROLLER, 'getDataFromTest')
    );
    app.post(
        '/v1/registerUser',
        CommonController.setCorsHeaders,
        CommonController.validateSchema(apiSchema.rules.register_user),
        boundMethod(controllerObject.USER_CONTROLLER, 'registerUser')
    );

    app.post(
        '/v1/login',
        CommonController.setCorsHeaders,
        boundMethod(controllerObject.USER_CONTROLLER, 'loginUser')
    );

    app.post(
        '/v1/book/summary',
        CommonController.setCorsHeaders,
        CommonController.validateSchema(bookApiSchema.rules.post_summary),
        boundMethod(controllerObject.USER_CONTROLLER, 'getUserDetails'),
        boundMethod(controllerObject.BOOK_CONTROLLER, 'getBookDetails'),
        boundMethod(controllerObject.BOOK_CONTROLLER, 'addOrEditBook'),
        boundMethod(controllerObject.BOOK_CONTROLLER, 'saveContent')
    );

    app.get(
        '/v1/home',
        CommonController.setCorsHeaders,
        boundMethod(controllerObject.BOOK_CONTROLLER, 'getHomePageContent'),
        boundMethod(controllerObject.USER_CONTROLLER, 'getUsersInfo'),
        boundMethod(controllerObject.BOOK_CONTROLLER, 'getBooksInfo'),
        ResponseController.sendResponse
    );

    app.post(
        '/v1/essays/summary',
        CommonController.setCorsHeaders,
        CommonController.validateSchema(essaySchema.rules.post_essay),
        boundMethod(controllerObject.USER_CONTROLLER, 'getUserDetails'),
        boundMethod(controllerObject.ESSAY_CONTROLLER, 'saveContent')
    );

    app.get(
        '/v1/essays',
        CommonController.setCorsHeaders,
        boundMethod(controllerObject.ESSAY_CONTROLLER, 'getHomePageContent'),
        boundMethod(controllerObject.USER_CONTROLLER, 'getUsersInfo'),
        ResponseController.sendResponse
    );

    app.post(
        '/v1/podcast/summary',
        CommonController.setCorsHeaders,
        CommonController.validateSchema(podcastApiSchema.rules.post_summary),
        boundMethod(controllerObject.USER_CONTROLLER, 'getUserDetails'),
        boundMethod(controllerObject.PODCAST_CONTROLLER, 'getPodcastDetails'),
        boundMethod(controllerObject.PODCAST_CONTROLLER, 'addOrEditPodcast'),
        boundMethod(controllerObject.PODCAST_CONTROLLER, 'saveContent')
    );

    app.get(
        '/v1/podcasts',
        CommonController.setCorsHeaders,
        boundMethod(controllerObject.PODCAST_CONTROLLER, 'getHomePageContent'),
        boundMethod(controllerObject.USER_CONTROLLER, 'getUsersInfo'),
        boundMethod(controllerObject.PODCAST_CONTROLLER, 'getPodcastsInfo'),
        ResponseController.sendResponse
    );
};