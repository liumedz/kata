module.exports = function(express){

    var localization = express.Router();

    localization.use(function(req, res, next) {
        next();
    });

    localization.get('/locale/:locale', function (req, res) {
        res.cookie('locale', req.params.locale);
        res.redirect('/' + req.param('redirect', ''));
    });

    localization.post('/locale', function (req, res) {
        res.cookie('locale', req.body.locale);
        res.send(200);
    });

    return localization;
};


