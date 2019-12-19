'use strict';
const Q = require('q');
const UTIL = require('util');
let Logger;

class AUTH_REPO {
    constructor(opts, dm){
        let self = this;
        self.DB_INSTANCE = dm.DB_INSTANCE || opts.DB_INSTANCE;
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

    getAuthDataByUserID(user_id) {
        let self = this;
        let deferred = Q.defer();
        let query = 'select * from auth where id = ' + Number(user_id);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getAuthDataBytoken(token) {
        let self = this;
        let deferred = Q.defer();
        let query = 'select * from auth where token = ' + token;
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    upsertAuthToken(data) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('INSERT INTO auth(user_id,token) VALUES(%s,"%s") ON DUPLICATE KEY UPDATE token="%s"',
                                data.user_id, data.token, data.token);
        Logger.info(`auth_upsertAuthtoken : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }
}

module.exports = AUTH_REPO;