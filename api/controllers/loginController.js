'use strict';

const path = require('path');

exports.login = function (req, res) {

    var appDir = path.dirname(require.main.filename);
    var filePath = path.join(appDir, 'ui/app/test/login.html');
    res.sendFile(filePath);
};