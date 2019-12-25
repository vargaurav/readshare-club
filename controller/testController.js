'use strict';
const Q = require('q');
let Logger;

class TEST_CONTROLLER {
    constructor(opts, dm){
        let self = this;
        self.DB_INSTANCE = dm.DB_INSTANCE || opts.DB_INSTANCE;
        dm.TEST_CONTROLLER = self;
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

    getDataFromTest(req, res, next) {
        let self = this;
        console.log(self);
        self.DB_INSTANCE.query('SELECT * from test', function (error, results, fields) {
            
            console.log(results);
        });
    }
}

module.exports = TEST_CONTROLLER;