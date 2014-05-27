module.exports = function(express, authorization, permissions){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();

    apiRouter.get('/permissions', isPermittedView, function(req, res) {
        var results = [];
        for(var key in permissions){
            results.push({name: permissions[key]});
        }
        res.send(results);
    });

    return apiRouter;

};


