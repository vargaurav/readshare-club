'use strict';
const Q = require('q');
const ESSAY_SERVICE = require('../service/essay');
const _ = require('lodash');
let Logger;


class ESSAY_CONTROLLER {
    constructor(opts, dm){
        let self = this;
        self.ESSAY_SERVICE = new ESSAY_SERVICE(opts, dm);
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

    saveContent(req, res, next) {
        let self = this;
        let data = {
            user_id: _.get(req.auth_data, 'user_id') || _.get(req.auth_data, 'user_data.id'),
            content: _.get(req.body, 'content'),
            is_thread: _.get(req.body, 'is_thread', 0),
            genre: _.get(req.body, 'genre', ''),
            name: _.get(req.body, 'name')
        }
        if(data.user_id && data.content && data.name){
            self.ESSAY_SERVICE.saveContent(data).then(function(response){
                res.status(200).json({"message":"Essay saved successfuly!"});
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

        self.ESSAY_SERVICE.getHomePageContent(count).then(function(result){
            let user_info = result.map(function(row){return row.user_id});
            res.body = {};
            res.body.content_info = result;
            res.body.user_info = user_info;
            return next();
        }).fail(function(err){
            res.status(400).json({"message":"Some error occured"});
        });
    }
}

module.exports = ESSAY_CONTROLLER;