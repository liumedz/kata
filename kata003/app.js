var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var expressSession = require('express-session');
var i18n = require("i18n");
var crypto = require("crypto");


var authorization = require('express-authorization');
var mongoose = require('mongoose');
var dbPath = 'mongodb://localhost/kata4';

var models = {
    userModel: require('./models/user')(mongoose),
    customerModel: require('./models/customer')(mongoose),
    ratingModel: require('./models/rating')(mongoose),
    roleModel: require('./models/role')(mongoose)
};


var userSeeder = require('./seeders/user')(models, crypto);
userSeeder.start();

var permissions = require('./common/permissions');

var roleSeeder = require('./seeders/role')(models, permissions);
roleSeeder.start();


var authorizationRoutes = require('./routes/authorization-routes')(express, permissions, models, crypto);
var localizationRoutes = require('./routes/localization-routes')(express);
var webRoutes = require('./routes/web-routes')(express, authorization);
var adminRoutes = require('./routes/admin-routes')(express, authorization, permissions, models);
var analyticsRoutes = require('./routes/analytics-routes')(express, authorization, permissions, models);
var rateRoutes = require('./routes/rate-routes')(express, authorization, permissions, models);
var ratingsApi = require('./api/ratings-api')(express, authorization, permissions, models);
var statisticsApi = require('./api/statistics-api')(express, authorization, permissions, models);
var customersApi = require('./api/customers-api')(express, authorization, permissions, models);
var usersApi = require('./api/users-api')(express, authorization, permissions, models, crypto);
var rolesApi = require('./api/roles-api')(express, authorization, permissions, models);
var permissionsApi = require('./api/permissions-api')(express, authorization, permissions);


i18n.configure({
    locales:['en', 'de', 'lt'],
    cookie: 'locale',
    directory: __dirname + '/locales'
});



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('kata003'));
mongoose.connect(dbPath);

app.use(expressSession());

if (app.get('env') === 'development'){
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'client')));
}

if (app.get('env') === 'production'){
    // view engine setup
    app.set('views', path.join(__dirname, 'bin', 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'bin', app.get('env'))));
}

app.use(i18n.init);

app.use('/', authorizationRoutes);
app.use('/', localizationRoutes);
app.use('/', webRoutes);
app.use('/api', ratingsApi);
app.use('/api', customersApi);
app.use('/api', statisticsApi);
app.use('/api', usersApi);
app.use('/api', rolesApi);
app.use('/api', permissionsApi);
app.use('/admin', adminRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/r', rateRoutes);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
