'use strict';
const Q = require('q');
const BOOK_SERVICE = require('../service/book');
const _ = require('lodash');
let Logger;


class BOOK_CONTROLLER {
    constructor(opts, dm){
        let self = this;
        self.BOOK_SERVICE = new BOOK_SERVICE(opts, dm);
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

    getBookDetails(req, res, next) {
        let self = this;
        req.body.name = req.body.name.toLoweCase();
        req.body.writer = req.body.writer.toLoweCase();
        self.BOOK_SERVICE.getBookByName(req.body.name).then(function(result){
            if(result.length == 1)
                req.body.book_details = result[0];
            else
                req.body.book_details = {};
            return next();

        }).fail(function(err){
            return next();
        });
    }

    addOrEditBook(req, res, next) {
        if(!_.isEmpty(req.body.book_details))
            return next();

        let self = this;
        
        self.BOOK_SERVICE.AddBook(req.body).then(function(result){
            req.body.book_details = result;
            return next();
            
        }).fail(function(err){
            return next();
        });
    }

    saveContent(req, res, next) {
        let self = this;
        let data = {
            user_id: _.get(req.auth_data, 'user_id') || _.get(req.auth_data, 'user_data.id'),
            book_id: _.get(req.body.book_details, 'id'),
            content: _.get(req.body, 'content'),
            is_thread: _.get(req.body, 'is_thread', 0),
            genre: _.get(req.body, 'genre', '')
        }
        if(data.user_id && data.book_id && data.content){
            self.BOOK_SERVICE.saveContent(data).then(function(response){
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

        self.BOOK_SERVICE.getHomePageContent(count).then(function(result){
            let user_info = result.map(function(row){return row.user_id});
            let book_info = result.map(function(row){return row.book_id});
            res.body = {};
            res.body.content_info = result;
            res.body.user_info = user_info;
            res.body.book_info = book_info;
            return next();
        }).fail(function(err){
            res.status(400).json({"message":"Some error occured"});
        });
    }

    getBooksInfo(req, res, next) {
        let self = this;
        let users = _.get(res.body, 'book_info', []);
        self.BOOK_SERVICE.getBooksInfo(users).then(function(result){
            res.body.book_info = result;
            return next();
        }).fail(function(err){
            res.status(400).json({"message":"Something went wrong!"});
        }); 
    }
}

module.exports = BOOK_CONTROLLER;