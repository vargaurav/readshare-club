'use strict';
const Q = require('q');
const USER_SERVICE = require('../service/user');
const AUTH_SERVICE = require('../service/auth');
let Logger;

class CommonService {
    constructor(opts, dm){
        let self = this;
        dm.USER_SERVICE = new USER_SERVICE(opts, dm);
        dm.AUTH_SERVICE = new AUTH_SERVICE(opts, dm);
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
}

module.exports = CommonService;