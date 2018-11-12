'use strict';

const passport = require('passport');

module.exports = function (app) {
    var loginController = require('../controllers/loginController');

    // testActivity Routes
    app.post('/app/test/login', passport.authenticate('marketing-cloud'), loginController.login);
};