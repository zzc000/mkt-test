'use strict';

const passport = require('passport');

module.exports = function (app) {
    var chanceSummaryController = require('../controllers/chanceSummaryController');

    // testActivity Routes
    app.post('/api/chanceSummary/list', passport.authenticate('marketing-cloud'), chanceSummaryController.retrieveMultiple);
};