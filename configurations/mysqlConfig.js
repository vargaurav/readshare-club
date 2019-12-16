'use strict'
let production =  {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'readshare'
};

let local = {
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'readshare'
};

if(process.env.NODE_ENV == 'production'){
    module.exports = production;
} else {
    module.exports = local;
}