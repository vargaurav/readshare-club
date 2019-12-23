'use strict';
const Q = require('q');
const UTIL = require('util');
let Logger;

class PODCAST_REPO {
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

    getPodcastByName(podcast_name) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from podcast where name = "%s"', podcast_name);
        Logger.info(`getPodcastByName_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getPodcastById(podcast_id) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from podcast where id = %s', podcast_id);
        Logger.info(`getPodcastById_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getAllPodcastsByGenre(genre) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from podcast where genre = "%s"', genre);
        Logger.info(`getAllPodcastsByGenre_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getAllPodcastssByWriter(writer) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from podcast where writer = "%s"', writer);
        Logger.info(`getAllPodcastssByWriter_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    upsertPodcast(opts) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('INSERT INTO podcast(name,writer,genre) VALUES("%s","%s","%s")',
                                opts.name, opts.writer, opts.genre);
        if(opts.writer && opts.genre) {
            query = query + UTIL.format('ON DUPLICATE KEY UPDATE writer="%s", genre="%s"', opts.writer,opts.genre);
        } else if(opts.writer) {
            query = query + UTIL.format('ON DUPLICATE KEY UPDATE writer="%s"', opts.writer);
        } else if(opts.genre) {
            query = query + UTIL.format('ON DUPLICATE KEY UPDATE writer="%s", genre="%s"',opts.genre);
        }
        Logger.info(`podcast_upsertPodcast : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    addPodcast(opts) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('INSERT INTO podcast(name,writer,genre) VALUES("%s","%s","%s")',
                                opts.name, opts.writer, opts.genre);
        Logger.info(`podcast_addPodcast : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getPodcastsInfo(podcasts){
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from podcast where id in (%s)', podcasts.toString());
        Logger.info(`getPodcastsInfo_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }
}

module.exports = PODCAST_REPO;