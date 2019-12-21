'use strict';
const Q = require('q');
const UTIL = require('util');
let Logger;

class BOOK_REPO {
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

    saveContent(opts) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('INSERT INTO book_summary(book_id,user_id,content,is_thread,genre) VALUES(%s,%s,"%s",%s,"%s")',
                                opts.book_id,opts.user_id,opts.content,opts.is_thread,opts.genre);
        Logger.info(`book_saveContent : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }
}

module.exports = BOOK_REPO;