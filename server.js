var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    session = require("express-session"),
    passport = require('passport');
bodyParser = require('body-parser');

require('./api/config/passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('ui')); // http://localhost:8080/activities/test/index.html
app.use('/mkt', express.static('ui')); // http://localhost:8080/mkt/activities/test/index.html




var routes = require('./api/routes/testActivityRoutes'); //importing route
routes(app); //register the route
var routes2 = require('./api/routes/loginRoutes');
routes2(app);
var routes3 = require('./api/routes/chanceSummaryRoutes');
routes3(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);