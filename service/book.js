'use strict';
const Q = require('q');
const BOOK_REPO = require('../repositories/book');
const BOOK_SUMMARY_REPO = require('../repositories/book_summary');
let Logger;

class BOOK_SERVICE {
    constructor(opts, dm){
        let self = this;
        self.BOOK_REPO = new BOOK_REPO(opts, dm);
        self.BOOK_SUMMARY_REPO = new BOOK_SUMMARY_REPO(opts, dm); 
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

    getBookByName(book_name) {
        let self = this;
        let deferred = Q.defer();

        new Q()
            .then(function(){
                return self.BOOK_REPO.getBookByName(book_name);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    getBookById(book_id) {
        let self = this;
        let deferred = Q.defer();
        
        new Q()
            .then(function(){
                return self.BOOK_REPO.getBookById(book_id);
            })
            .then(function(result){
                if(result.length == 0){
                    return deferred.reject(new Error("Book not found!"));
                } else {
                    return deferred.resolve(result[0]);
                }
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    AddBook(opts) {
        let self = this;
        let deferred = Q.defer();

        let data = {
            name: opts.name,
            writer: opts.writer,
            genre: opts.genre
        };

        new Q()
            .then(function(){
                return self.BOOK_REPO.addBook(data);
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
            book_id: opts.book_id,
            user_id: opts.user_id,
            content: opts.content,
            is_thread: opts.is_thread || 0,
            genre: opts.genre
        };

        new Q()
            .then(function(){
                return self.BOOK_SUMMARY_REPO.saveContent(data);
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
                return self.BOOK_SUMMARY_REPO.getHomePageContent(count);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                return deferred.reject(err);
            });

        return deferred.promise;
    }

    getBooksInfo(books){
        let self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                return self.BOOK_REPO.getBooksInfo(books);
            })
            .then(function(result){
                return deferred.resolve(result);
            })
            .fail(function(err){
                Logger.info(`Error in getting book details ${err}`);
                return deferred.reject(err);
            });

        return deferred.promise;
    }
} 

module.exports = BOOK_SERVICE;