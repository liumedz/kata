module.exports = function(express, authorization, clames, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(clames.admin);

    var adminRouter = express.Router();

    adminRouter.use(function(req, res, next) {
        next();
    });

    adminRouter.get('/', isPermittedView, function(req, res) {
        res.render('admin/index', {title: 'beirate - admin'});
    });

    adminRouter.use(function(req, res, next) {
        res.redirect('/admin');
    });

    return adminRouter;
};


