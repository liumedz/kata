module.exports = function(express, authorization, clames, models, crypto){

    var isPermittedView = authorization.ensureRequest.isPermitted(clames.usersManagement);

    var apiRouter = express.Router();

    apiRouter.get('/users', isPermittedView, function(req, res) {
        models.userModel.User.find(req.query, {password: 0}, function (err, data, count) {
            res.send(data);
        });
        /*       models.userModel.User.find(req.query).populate('customers').exec(function (err, data, count) {
         res.send(data);
         });*/
    });

    apiRouter.post('/users', isPermittedView, function(req, res) {
        var user = new models.userModel.User(req.body);
        var shaSum = crypto.createHash('sha256');
        shaSum.update(user.password);
        user.password = shaSum.digest('hex');
        user.save(function (err, data, count) {
                res.send(data);
            }
        );
    });

    apiRouter.put('/users/:_id', isPermittedView, function(req, res) {
        var user = req.body;
        if(user.password){
            var shaSum = crypto.createHash('sha256');
            shaSum.update(user.password);
            user.password = shaSum.digest('hex');
        }
        models.userModel.User.findByIdAndUpdate(req.params._id, user, function (err, numberAffected, raw) {
            res.send(200);
        });
    });

    apiRouter.delete('/users/:_id', isPermittedView, function(req, res) {
        models.userModel.User.remove({_id: req.params._id}, function (err, data) {
            res.send(data);
        });
    });

    return apiRouter;
};


