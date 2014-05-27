module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();

    apiRouter.get('/ratings', function (req, res) {
        models.ratingModel.Rating.find(function (err, ratings) {
            res.send(ratings);
        });
    });

    apiRouter.post('/ratings', function (req, res) {
        var rating = new models.ratingModel.Rating(req.body);
        rating.save(function (err, data, count) {
                res.send(data);
            }
        );
    });

    apiRouter.get('/r/:c/:d/:o/:r', function (req, res) {
        var rating = new models.ratingModel.Rating(req.params);
        rating.save(function (err, data, count) {
            models.ratingModel.Rating.find(function (err, data, count) {
                res.send(data);
            });
        });
    });

    return apiRouter;
};


