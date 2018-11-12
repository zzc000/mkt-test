'use strict';

module.exports = function (app) {
    var testActivity = require('../controllers/testActivityController');

    // testActivity Routes
    app.route('/activity/test/config.json')
        .get(testActivity.config);

    app.route('/activity/test/execute')
        .post(testActivity.execute);

    app.route('/activity/test/publish')
        .post(testActivity.publish);

    app.route('/activity/test/validate')
        .post(testActivity.validate);
};