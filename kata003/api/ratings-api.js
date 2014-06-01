module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();

    apiRouter.get('/ratings', isPermittedView, function (req, res) {
        models.ratingModel.Rating.find(function (err, ratings) {
            res.send(ratings);
        });
    });

    apiRouter.post('/ratings', isPermittedView, function (req, res) {
        var rating = new models.ratingModel.Rating(req.body);
        rating.save(function (err, data, count) {
                res.send(data);
            }
        );
    });

    apiRouter.put('/ratings/:_id', isPermittedView, function (req, res) {
        models.ratingModel.Rating.findById(req.params._id, function (err, rating) {
            if (rating) {
                rating.disabled = req.body.disabled;
                rating.save(function (err, rating, count) {
                        res.send(rating);
                    }
                );
            }
        });
    });

    apiRouter.post('/rate', function (req, res) {
        if(req.session.rating && req.body.clientInfo){
            var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
            var fingerprint = req.body.clientInfo.fingerprint;
            var clientInfo = req.body.clientInfo;

            var now = new Date();
            var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            models.ratingModel.Rating.findOne({created: {$gt: start},
                c: req.session.rating.c,
                d: req.session.rating.d,
                o: req.session.rating.o,
                fingerprint: fingerprint,
                $or: [{disabled: undefined}, {disabled: false}]
            }, function (err, data, count) {
                if(data === null){

                    var rating = new models.ratingModel.Rating(req.session.rating);
                    rating.fingerprint = fingerprint;
                    rating.ip = ip;
                    rating.clientInfo = clientInfo;
                    rating.save(function (err, data, count) {
                            res.send({error: 0, message: 'Thanks for your rating!', _commentId: data._id});
                        }
                    );
                }
                else{
                    res.send({error: 2, message: 'You have been rated today!'});
                }
            });
        }
        else{
            res.send({error: 1, message: 'Woops!'});
        }
    });


    return apiRouter;
};


