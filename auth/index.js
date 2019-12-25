'use strict'
const crypto = require('./authCrypto');

var authLib = {
    encryptToken: function(data, callback) {
        let encobject = {};
        if(data.user_id && data.password && data.token){
            crypto.encrypt(data.user_id, function(err, result){
                if(err)
                    callback(err);
                encobject.user_id = result;
                crypto.encrypt(data.password, function(err, res){
                    if(err)
                        callback(err);
                    encobject.password = res;
                    crypto.encrypt(data.token, function(err, r){
                        if(err)
                            callback(err);
                        encobject.token = r;
                    });
                });
            });
            callback(null, encobject);  
        } else {
            callback(new Error("Some parameter is missing!"));
        }
    }, 

    decryptToken: function(token,callback) {
        let encStrings = token.split("-");
        if(encStrings.length == 3){
            let data = {};
            crypto.decrypt(encStrings[0].toString(), function(err, result){
                if(err)
                    callback(err);
                data.user_id = result;
                crypto.decrypt(encStrings[1].toString(), function(err, res){
                    if(err)
                        callback(err);
                    data.password = res;
                    crypto.decrypt(encStrings[2].toString(), function(err, r){
                        if(err)
                            callback(err);
                        data.token = r;
                    });
                });
            });
            callback(null, data);
        } else {
            callback(new Error("invalid Token"));
        }
    }
};


module.exports = authLib;