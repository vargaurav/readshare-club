'use strict';
const Q = require('q');
const AUTH_REPO = require('../repositories/auth');
const crypto = require('../auth');
const randomstring = require("randomstring");
let Logger;

class AUTH_SERVICE {
    constructor(opts, dm){
        let self = this;
        self.AUTH_REPO = new AUTH_REPO(opts, dm); 
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

    updateTokenInAuth(opts) {
        let self = this;
        let deferred = Q.defer();

        let data = {
            user_id: opts.id.toString(),
            password: opts.password.toString(),
            token: randomstring.generate({
                length: 12,
                charset: 'alphabetic'
              }).toString()
        };

        crypto.encryptToken(data, function(err, result){
            if(err){
                return deferred.reject(new Error("Some Error occured!"));
            } else {
                self.AUTH_REPO.upsertAuthToken(data).then(function(res){
                    let sso_token = result.user_id + "-" + result.password + "-" + result.token;
                    return deferred.resolve(sso_token);
                }).fail(function(error){
                    return deferred.reject(error);
                });
            }
        });

        return deferred.promise;
    }

    getUserDataByUserId(user_id) {
        let self = this;
        let deferred = Q.defer();
        new Q()
            .then(function(){
                return self.AUTH_REPO.getAuthDataByUserID(user_id);
            })
            .then(function(result){
                if(result.length == 1){
                    return deferred.resolve(result[0]);
                } else {
                    return deferred.reject(new Error("User Not found!"));
                }
            })
            .fail(function(err){
                Logger.info(`Error in getting user details ${err}`);
                return deferred.reject(err);
            });

        return deferred.promise;
    }
}

module.exports = AUTH_SERVICE;