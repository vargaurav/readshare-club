'use strict';
const Q = require('q');
const PODCAST_SERVICE = require('../service/podcast');
const _ = require('lodash');
let Logger;


class PODCAST_CONTROLLER {
    constructor(opts, dm){
        let self = this;
        self.PODCAST_SERVICE = new PODCAST_SERVICE(opts, dm);
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

    getPodcastDetails(req, res, next) {
        let self = this;
        req.body.name = req.body.name.toLowerCase();
        req.body.writer = req.body.writer.toLowerCase();
        self.PODCAST_SERVICE.getPodcastByName(req.body.name).then(function(result){
            if(result.length == 1)
                req.body.podcast_details = result[0];
            else
                req.body.podcast_details = {};
            return next();

        }).fail(function(err){
            return next();
        });
    }

    addOrEditPodcast(req, res, next) {
        if(!_.isEmpty(req.body.podcast_details))
            return next();

        let self = this;
        
        self.PODCAST_SERVICE.AddPodcast(req.body).then(function(result){
            req.body.podcast_details = result;
            return next();
            
        }).fail(function(err){
            return next();
        });
    }

    saveContent(req, res, next) {
        let self = this;
        let data = {
            user_id: _.get(req.auth_data, 'user_id') || _.get(req.auth_data, 'user_data.id'),
            podcast_id: _.get(req.body.podcast_details, 'id'),
            content: _.get(req.body, 'content'),
            is_thread: _.get(req.body, 'is_thread', 0),
            genre: _.get(req.body, 'genre', '')
        }
        if(data.user_id && data.podcast_id && data.content){
            self.PODCAST_SERVICE.saveContent(data).then(function(response){
                res.status(200).json({"message":"summary saved successfuly!"});
            }).fail(function(err){
                res.status(400).json({"message":"Something went wrong!"});
            });
        } else {
            res.status(400).json({"message":"Something went wrong!"});
        }
    }

    getHomePageContent(req, res, next) {
        let count = _.get(req.query, 'count', 0);
        let self = this;

        self.PODCAST_SERVICE.getHomePageContent(count).then(function(result){
            let user_info = result.map(function(row){return row.user_id});
            let podcast_info = result.map(function(row){return row.podcast_id});
            res.body = {};
            res.body.content_info = result;
            res.body.user_info = user_info;
            res.body.podcast_info = podcast_info;
            return next();
        }).fail(function(err){
            res.status(400).json({"message":"Some error occured"});
        });
    }

    getPodcastsInfo(req, res, next) {
        let self = this;
        let users = _.get(res.body, 'podcast_info', []);
        self.PODCAST_SERVICE.getPodcastsInfo(users).then(function(result){
            res.body.podcast_info = result;
            return next();
        }).fail(function(err){
            res.status(400).json({"message":"Something went wrong!"});
        }); 
    }
}

module.exports = PODCAST_CONTROLLER;