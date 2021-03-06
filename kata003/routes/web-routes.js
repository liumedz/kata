module.exports = function(express){

    var web = express.Router();

    web.use(function(req, res, next) {
        next();
    });

    web.get('/', function(req, res, next) {
        var locale = req.cookies.locale;
        res.render('web/index', {locale: locale});
    });

    return web;
};


