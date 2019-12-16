'use strict';
var commonController = {
    apiNoLongerSupported: (req, res, next) => {
        return res.status(400).json({message: 'This api is not supported'});
    },
};

module.exports = commonController;