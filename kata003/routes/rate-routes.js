module.exports = function(express, authorization, clames, crypto, models){

    var adminRouter = express.Router();

    adminRouter.use(function(req, res, next) {
        next();
    });

    adminRouter.get('/:c/:d/:o/:r', function(req, res) {
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        var md5sum = crypto.createHash('md5');
        md5sum.update(ip);
        var iPmd5sum = md5sum.digest('hex');
        req.session.rating = {rid: iPmd5sum, created: new Date(), c: req.params.c, d: req.params.d, o: req.params.o, r: req.params.r };
        res.redirect('/r');
    });

    adminRouter.get('/', function(req, res) {
        if(req.session.rating){
            res.render('rate/index', {title: 'beirate - rate', r: req.session.rating.r});
        }
        else{
            res.redirect('/');
        }
    });

    adminRouter.use(function(req, res, next) {
        res.redirect('/');
    });

    return adminRouter;
};


