'use strict';
const Q = require('q');
const ESSAY_REPO = require('../repositories/essay');
let Logger;

class ESSAY_SERVICE {
    constructor(opts, dm){
        let self = this;
        self.ESSAY_REPO = new ESSAY_REPO(opts, dm); 
        Logger = self.Logger = opts.Logger || require('../lib/logger');
    }

    init(opts) {
        let self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                deferred.resolve();
            }).fail(function(err){
                deferred.reject();
            });
        return deferred.promise;
    }

    saveContent(opts){
        let self = this;
        let deferred = Q.defer();

        let data = {
            user_id: opts.user_id,
            content: opts.content,
            is_thread: opts.is_thread || 0,
            genre: opts.genre,
            name: opts.name
        };

        new Q()
            .then(function(){
                return self.ESSAY_REPO.saveContent(data);
            })
            .then(function(result){
                data.id = result.insertId;
                return deferred.resolve(data);
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    getHomePageContent(count) {
        let self = this;
        let deferred = Q.defer();

        new Q()
            .then(function(){
                return self.ESSAY_REPO.getHomePageContent(count);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }
} 

module.exports = ESSAY_SERVICE;