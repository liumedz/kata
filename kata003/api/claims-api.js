module.exports = function(express, authorization, clames){

    var isPermittedView = authorization.ensureRequest.isPermitted(clames.usersManagement);

    var apiRouter = express.Router();

    apiRouter.get('/claims', isPermittedView, function(req, res) {
        var results = [];
        for(var key in clames){
            results.push(clames[key]);
        }
        res.send(results);
    });

    return apiRouter;
};


