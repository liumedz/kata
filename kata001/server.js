// server.js (Express 4.0)
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');
var i18n = require("i18n");
var url = require('url');
var cookieParser = require('cookie-parser');
var engine = require('ejs-locals');

mongoose.connect('mongodb://localhost/kata1');

i18n.configure({
    locales:['en', 'de', 'lt'],
    cookie: 'locale',
    directory: __dirname + '/locales'
});


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride()); // simulate DELETE and PUT
app.use(cookieParser('kata1'));


//app.engine('ejs', require('ejs').__express);
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(i18n.init);


app.get('/locale/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('/' + req.param('redirect', ''));
});

app.post('/locale', function (req, res) {
    res.cookie('locale', req.body.locale);
    res.send(200);
});


app.get('/', function(req, res){
    i18n.setLocale(req.params.locale);
    res.render('index');
});

app.listen(9090);
console.log('Magic happens on port ' + 9090);