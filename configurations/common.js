'use strict'
let production =  {
    anonymous_user_id: 4
};

let local = {
    anonymous_user_id: 4
};

if(process.env.NODE_ENV == 'production'){
    module.exports = production;
} else {
    module.exports = local;
}