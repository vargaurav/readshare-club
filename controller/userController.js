'use strict';
const Q = require('q');
const USER_SERVICE = require('../service/user');
const AUTH_SERVICE = require('../service/auth');
const crypto = require('../auth');
const _ = require('lodash');
const CONFIG = require('../configurations');
let Logger;


class USER_CONTROLLER {
    constructor(opts, dm){
        let self = this;
        self.USER_SERVICE = new USER_SERVICE(opts, dm);
        self.AUTH_SERVICE = new AUTH_SERVICE(opts, dm);
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

    registerUser(req, res, next) {
        let self = this;
        self.USER_SERVICE.registerUser(req.body).then(function(result){
            res.status(201).json({"message": "Registration Successful"});
        }).fail(function(err){
            res.status(400).send(err.message || "Some error occured!!");
        });
    }

    loginUser(req, res, next) {
        let self = this;
        if(req.headers.sso_token){
            self.loginbyToken(req, res, next);
        } else {
            if(req.body.email_id && req.body.password){
                self.loginByIdPass(req, res, next);
            } else {
                res.status(400).json({"message":"Some parameter is missing!"});
            }
        }
    }

    loginbyToken(req, res, next) {
        let self = this;
        crypto.decryptToken(req.headers.sso_token, function(err, data){
            if(err){
                res.status(401).json({"message":"Invalid token"});
            } else {
                self.AUTH_SERVICE.getUserDataByUserId(data.user_id).then(function(auth_data){
                    self.USER_SERVICE.getUserDataById(data.user_id).then(function(user_data){
                        if(data.password == user_data.password && data.token == auth_data.token){
                            res.status(200).json({"message":"login successful"});
                        } else {
                            res.status(401).json({"message":"Invalid Token"});
                        }
                    }).fail(function(error){
                        res.status(500).json({"message":"User not found"});
                    });
                }).fail(function(error){
                    res.status(500).json({"message":"User not found"});
                });
            }
        });
    }

    loginByIdPass(req, res, next) {
        let self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                return self.USER_SERVICE.getUserDataByEmail(_.get(req.body, 'email_id', ''));
            })
            .then(function(result){
                if(_.get(result, 'password', '') != _.get(req.body, 'password')){
                    deferred.reject();
                    res.status(401).json({"message":"Incorrect Password"});
                } else {
                    return self.AUTH_SERVICE.updateTokenInAuth(result);
                }
            })
            .then(function(sso_token){
                deferred.resolve();
                res.status(200).json({"sso_token":sso_token});
            })
            .fail(function(error){
                Logger.error(`customerController_loginByIdPass : ${error}`);
                deferred.reject();
                res.status(500).json({"message": "some error occurred!"});
            });
        
    }

    getDataCorrespondingToToken(sso_token) {
        let self = this;
        let deferred = Q.defer();

        new Q()
            .then(function(){
                crypto.decryptToken(sso_token, function(err, data){
                    if(err){
                        return deferred.reject(new Error("Invalid token"));
                    } else {
                        self.AUTH_SERVICE.getUserDataByUserId(data.user_id).then(function(auth_data){
                            self.USER_SERVICE.getUserDataById(data.user_id).then(function(user_data){
                                if(data.password == user_data.password && data.token == auth_data.token){
                                    data.auth_data = auth_data;
                                    data.user_data = user_data;
                                    return deferred.resolve(data);
                                } else {
                                    return deferred.reject(new Error("Invalid Token"));
                                }
                            }).fail(function(error){
                                return deferred.reject(new Error("User Not Found"));
                            });
                        }).fail(function(error){
                            return deferred.reject(new Error("User Not Found"));
                        });
                    }
                });
            })
            .fail(function(err) {
                return deferred.reject(new Error("Some error occurred"));
            });

        return deferred.promise;
    }

    getUserDetails(req, res, next) {
        let self = this;
        if(req.headers.sso_token) {
            self.getDataCorrespondingToToken(req.headers.sso_token).then(function(result){
                _.set(req, 'auth_data', result);
                return next();
            }).fail(function(err){
                res.status(400).json({"message": err.message || "Some error occurred"});
            });
        } else if(req.headers.is_anonymous) {
            self.USER_SERVICE.getUserDataById(CONFIG.common.anonymous_user_id).then(function(result){
                let data = {};
                data.user_id = 4;
                data.user_data = result;
                _.set(req, 'auth_data', data);
                return next();
            }).fail(function(err){
                res.status(400).json({"message": err.message || "Some error occurred"});
            });
        } else {
            res.status(400).json({"message":"Either write anonymously or login"});
        }
    }

    getUsersInfo(req, res, next) {
        let self = this;
        let users = _.get(res.body, 'user_info', []);
        self.USER_SERVICE.getUsersInfo(users).then(function(result){
            let user_info = {};
            result.forEach(element => {
                user_info[element.id.toString()] = element.user_name.toString();
            });
            res.body.user_info = user_info;
            return next();
        }).fail(function(err){
            console.log(err);
            res.status(400).json({"message":"Something went wrong!"});
        }); 
    }
}

module.exports = USER_CONTROLLER;