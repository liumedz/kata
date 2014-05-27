module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();

    apiRouter.get('/customers', isPermittedView, function (req, res) {
        models.customerModel.Customer.find(req.query, function (err, data, count) {
            res.send(data);
        });
    });

    apiRouter.get('/customers/:_id', isPermittedView, function (req, res) {
        models.customerModel.Customer.findById(req.params._id, function (err, data, count) {
            res.send(data);
        });
    });

    apiRouter.post('/customers', isPermittedView, function (req, res) {
        var data = new models.customerModel.Customer(req.body);
        data.save(function (err, data, count) {
                res.send(data);
            }
        );
    });

    apiRouter.put('/customers/:_id', isPermittedView, function (req, res) {
        models.customerModel.Customer.findByIdAndUpdate(req.params._id, req.body, function (err, numberAffected, raw) {
            res.send(200);
        });
    });

    apiRouter.delete('/customers/:_id', isPermittedView, function (req, res) {
        models.customerModel.Customer.remove({ _id: req.params._id }, function (err, data) {
            res.send(data);
        });
    });

    return apiRouter;
};


