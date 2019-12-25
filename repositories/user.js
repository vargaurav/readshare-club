'use strict';
const Q = require('q');
const UTIL = require('util');
let Logger;

class USER_REPO {
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

    getUserDataByID(id) {
        let self = this;
        let deferred = Q.defer();
        let query = 'select * from user where id = ' + Number(id);
        Logger.info(`getUserDataByID_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getUserDataByEmail(gmail_id) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from user where gmail_id = "%s"', gmail_id.toString());
        Logger.info(`getUserDataByEmail_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    insertIntoUser(data){
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('insert into user (user_name, password, gmail_id) values ("%s", "%s", "%s")',
                                data.user_name.toString(), data.password.toString(), data.gmail_id.toString());
        Logger.info(`insertIntoUser_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getUsersInfo(usres){
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from user where id in (%s)', usres.toString());
        Logger.info(`getUsersInfo_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }
}

module.exports = USER_REPO;