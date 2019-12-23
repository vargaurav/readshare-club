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

    getBookByName(book_name) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from book where name = "%s"', book_name);
        Logger.info(`getBookByName_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getBookById(book_id) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from book where id = %s', book_id);
        Logger.info(`getBookById_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getAllBooksByGenre(genre) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from book where genre = "%s"', genre);
        Logger.info(`getAllBooksByGenre_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getAllBooksByWriter(writer) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from book where writer = "%s"', writer);
        Logger.info(`getAllBooksByGenre_Query : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    upsertBook(opts) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('INSERT INTO book(name,writer,genre) VALUES("%s","%s","%s")',
                                opts.name, opts.writer, opts.genre);
        if(opts.writer && opts.genre) {
            query = query + UTIL.format('ON DUPLICATE KEY UPDATE writer="%s", genre="%s"', opts.writer,opts.genre);
        } else if(opts.writer) {
            query = query + UTIL.format('ON DUPLICATE KEY UPDATE writer="%s"', opts.writer);
        } else if(opts.genre) {
            query = query + UTIL.format('ON DUPLICATE KEY UPDATE writer="%s", genre="%s"',opts.genre);
        }
        Logger.info(`book_upsertBook : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    addBook(opts) {
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('INSERT INTO book(name,writer,genre) VALUES("%s","%s","%s")',
                                opts.name, opts.writer, opts.genre);
        Logger.info(`book_addBook : ${query}`);
        self.DB_INSTANCE.query(query, function (error, result) {
            if(error)
                return deferred.reject(error);
            else 
                return deferred.resolve(result);
        });

        return deferred.promise;
    }

    getBooksInfo(books){
        let self = this;
        let deferred = Q.defer();
        let query = UTIL.format('select * from book where id in (%s)', books.toString());
        Logger.info(`getBooksInfo_Query : ${query}`);
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