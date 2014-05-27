module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();

    apiRouter.get('/roles', isPermittedView, function(req, res) {
        models.roleModel.Role.find(function (err, roles, count) {
            res.send(roles);
        });
    });

    apiRouter.post('/roles', isPermittedView, function(req, res) {
        var user = new models.roleModel.Role(req.body);
        user.save(function (err, role, count) {
                res.send(role);
            }
        );
    });

    apiRouter.put('/roles/:_id', isPermittedView, function (req, res) {
        models.roleModel.Role.findByIdAndUpdate(req.params._id, req.body, function (err, numberAffected, raw) {
            res.send(200);
        });
    });

    apiRouter.delete('/roles/:_id', isPermittedView, function (req, res) {
        models.roleModel.Role.remove({ _id: req.params._id }, function (err, data) {
            res.send(data);
        });
    });

    return apiRouter;
    
};


