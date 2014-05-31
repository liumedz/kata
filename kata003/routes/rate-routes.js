module.exports = function(express, authorization, clames, models){

    var adminRouter = express.Router();

    adminRouter.use(function(req, res, next) {
        next();
    });

    adminRouter.get('/:c/:d/:o/:r', function(req, res) {
        res.render('rate/index', {title: 'beirate - rate'});
    });

    adminRouter.use(function(req, res, next) {
        res.redirect('/');
    });

    return adminRouter;
};


