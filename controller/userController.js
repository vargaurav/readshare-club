'use strict';
const Q = require('q');
const USER_SERVICE = require('../service/user');
const AUTH_SERVICE = require('../service/auth');
let Logger;


class USER_CONTROLLER {
    constructor(opts, dm){
        let self = this;
        self.USER_SERVICE = new USER_SERVICE(opts, dm);
        self.AUTH_SERVICE = new AUTH_SERVICE(opts, dm);
        Logger = self.Logger = opts.Logger || require('../lib/logger');
    }

    init(opts) {
        var self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                deferred.resolve();
            }).fail(function(err){
                deferred.reject();
            });
        return deferred.promise;
    }

    registerUser(req, res, next) {
        let self = this;
        self.USER_SERVICE.registerUser(req.body).then(function(result){
            res.status(201).json({"message": "Registration Successful"});
        }).fail(function(err){
            res.status(400).send(err.message || "Some error occured!!");
        });
    }
}

module.exports = USER_CONTROLLER;