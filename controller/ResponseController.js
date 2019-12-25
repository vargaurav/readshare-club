'use strict';
let response = {
    setResponse: function (req, res, next) {
        
    },

    sendResponse: function (req, res, next) {
        res.status(200).json(res.body);
    },

    sendFailure: function (next, responseCode) {
        
    }
};

module.exports = response;
