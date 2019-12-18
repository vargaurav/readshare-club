'use strict';
const Q = require('q');
const USER_REPO = require('../repositories/user');
let Logger;

class USER_SERVICE {
    constructor(opts, dm){
        let self = this;
        self.USER_REPO = new USER_REPO(opts, dm); 
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

    registerUser(data) {
        let self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                return self.USER_REPO.insertIntoUser(data);
            })
            .then(function(result){
                Logger.info(`User Registered ${data.gmail_id}`);
                return deferred.resolve();
            })
            .fail(function(err){
                Logger.info(`Error im User Registeration ${err}`);
                return deferred.reject(err);
            });

        return deferred.promise;
    }
}

module.exports = USER_SERVICE;