module.exports = function(express, authorization, clames, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(clames.webIndex);

    var adminRouter = express.Router();

    adminRouter.use(function(req, res, next) {
        next();
    });

    adminRouter.get('/', isPermittedView, function(req, res) {
        res.render('admin/index', {title: 'beirate - admin'});
    });

    adminRouter.get('/users', isPermittedView, function(req, res) {
        models.userModel.User.find(req.query, function (err, data, count) {
            res.send(data);
        });
    });

    adminRouter.post('/users', isPermittedView, function(req, res) {
        var data = new models.userModel.User(req.body);
        data.save(function (err, data, count) {
                res.send(data);
            }
        );
    });

    adminRouter.put('/users/:_id', isPermittedView, function(req, res) {
        models.userModel.User.findByIdAndUpdate(req.params._id, req.body, function (err, numberAffected, raw) {
            res.send(200);
        });
    });


    adminRouter.get('/customers', isPermittedView, function (req, res) {
        models.customerModel.Customer.find(req.query, function (err, data, count) {
            res.send(data);
        });
    });

    adminRouter.get('/customers/:_id', isPermittedView, function (req, res) {
        models.customerModel.Customer.findById(req.params._id, function (err, data, count) {
            res.send(data);
        });
    });

    adminRouter.post('/customers', isPermittedView, function (req, res) {
        var data = new models.customerModel.Customer(req.body);
        data.save(function (err, data, count) {
            res.send(data);
        }
        );
    });

    adminRouter.put('/customers/:_id', isPermittedView, function (req, res) {
        models.customerModel.Customer.findByIdAndUpdate(req.params._id, req.body, function (err, numberAffected, raw) {
            res.send(200);
        });
    });


    adminRouter.use(function(req, res, next) {
        res.redirect('/admin');
    });

    return adminRouter;
};


