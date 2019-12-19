'use strict';
const Logger = require('./logger');
const Q = require('q');
const mysqlConfig = require('../configurations').mysql;
const mysql = require('mysql');

let connection = null;

let init = function() {
    let deferred = Q.defer();

    new Q()
        .then(function(){
            connection = mysql.createConnection(mysqlConfig);
            connection.connect(function(err, result){
                if(err){
                    Logger.error(`Error in connecting mysql ${err}`);
                    return deferred.reject(err);
                } else {
                    Logger.info('Mysql connection created successfully!');
                    return deferred.resolve(connection);
                }
            });
        })
        .fail(function(err){
            Logger.error(`Error in connecting mysql ${err}`);
            return deferred.reject(err);
        });

    return deferred.promise;
};

let getMySqlClient = function(){
    let deferred = Q.defer();
    
    new Q()
        .then(function(){
        if(connection)
            return deferred.resolve(connection);
        else 
            return init();
        })
        .then(function(con){
            return deferred.resolve(connection);
        })
        .fail(function(err){
            Logger.error(`Error in connecting mysql ${err}`);
            return deferred.reject(err);
        });

    return deferred.promise;
};

module.exports = {
    init,
    getMySqlClient
};