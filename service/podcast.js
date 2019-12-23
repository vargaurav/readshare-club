'use strict';
const Q = require('q');
const PODCAST_REPO = require('../repositories/podcast');
const PODCAST_SUMMARY_REPO = require('../repositories/podcast_summary');
let Logger;

class PODCAST_SERVICE {
    constructor(opts, dm){
        let self = this;
        self.PODCAST_REPO = new PODCAST_REPO(opts, dm);
        self.PODCAST_SUMMARY_REPO = new PODCAST_SUMMARY_REPO(opts, dm); 
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

    getPodcastByName(name) {
        let self = this;
        let deferred = Q.defer();

        new Q()
            .then(function(){
                return self.PODCAST_REPO.getPodcastByName(name);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    getPodcastById(id) {
        let self = this;
        let deferred = Q.defer();
        
        new Q()
            .then(function(){
                return self.PODCAST_REPO.getPodcastById(id);
            })
            .then(function(result){
                if(result.length == 0){
                    return deferred.reject(new Error("Podcast not found!"));
                } else {
                    return deferred.resolve(result[0]);
                }
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    AddPodcast(opts) {
        let self = this;
        let deferred = Q.defer();

        let data = {
            name: opts.name,
            writer: opts.writer,
            genre: opts.genre
        };

        new Q()
            .then(function(){
                return self.PODCAST_REPO.addPodcast(data);
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

    saveContent(opts){
        let self = this;
        let deferred = Q.defer();

        let data = {
            podcast_id: opts.podcast_id,
            user_id: opts.user_id,
            content: opts.content,
            is_thread: opts.is_thread || 0,
            genre: opts.genre
        };

        new Q()
            .then(function(){
                return self.PODCAST_SUMMARY_REPO.saveContent(data);
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
                return self.PODCAST_SUMMARY_REPO.getHomePageContent(count);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    getPodcastsInfo(ids){
        let self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                return self.PODCAST_REPO.getPodcastsInfo(ids);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                Logger.info(`Error in getting podcast details ${err}`);
                return deferred.reject(err);
            });

        return deferred.promise;
    }
} 

module.exports = PODCAST_SERVICE;