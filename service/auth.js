'use strict';
const Q = require('q');
const AUTH_REPO = require('../repositories/auth');
let Logger;

class AUTH_SERVICE {
    constructor(opts, dm){
        let self = this;
        self.AUTH_REPO = new AUTH_REPO(opts, dm); 
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

module.exports = AUTH_SERVICE;