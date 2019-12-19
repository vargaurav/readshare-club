'use strict';

const boundMethod = (object, methodName) => object[methodName].bind(object);


module.exports = boundMethod;