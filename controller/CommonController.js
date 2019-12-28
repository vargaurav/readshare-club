'use strict';
var asyncValidator = require('async-validator-2');
const Logger = require('../lib/logger');
var commonController = {
    apiNoLongerSupported: (req, res, next) => {
        return res.status(400).json({message: 'This api is not supported'});
    },

    validateSchema: (rules) => {
        return (req, res, next) => {
            var validator = new asyncValidator(rules);
            validator.validate(req.body, function(error, result){
                if(error){
                    Logger.error('validateSchema ', 'with', JSON.stringify(error));
                    return res.status(400).send(error);
                } else {
                    next();
                }
            });
        };
    },

        setCorsHeaders: function (req, res, next) {
        let requestDomain = req.headers.Origin;
        // AllowedOrigins.forEach(allowedOrigin => {
        //     if (requestDomain === allowedOrigin) {
                
        //     }
        // });
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Add methods here, if more need to be supported.
        res.setHeader(
            'Access-Control-Allow-Headers',
            'origin, sso_token, sso_token_enc,' +
            ' content-type, accept, authorization,' +
            ' authorization, cache-control, credentials,' +
            ' x-xsrf-token, x-csrf-token'
        );
        if (req.method === 'OPTIONS') {
            res.status(200);
        } else {
            next();
        }
    }
};

module.exports = commonController;