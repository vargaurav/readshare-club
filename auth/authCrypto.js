'use strict'
const crypto = require('crypto');
let key = "bdjbdvudvujbxjxbdwjdwjhwjsbxjsxjsxsjxsjjhjwuuwjhbxu";
function encrypt(text, callback){
    try{
        var cipher = crypto.createCipher('aes-256-cbc',key)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        callback(null, crypted);
    } catch(ex) {
        callback(ex);
    }
};
  
function decrypt(text, callback){
  try{
      var decipher = crypto.createDecipher('aes-256-cbc',key)
      var dec = decipher.update(text,'hex','utf8')
      dec += decipher.final('utf8');
      callback(null, dec);
  } catch(ex) {
      callback(ex);
  }
};

module.exports = {
    encrypt,
    decrypt
};