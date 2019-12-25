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
    }
};

module.exports = commonController;