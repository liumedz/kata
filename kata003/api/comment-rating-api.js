module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();

    apiRouter.put('/ratings/:_id/comment', function (req, res) {
        models.ratingModel.Rating.findByIdAndUpdate(req.params._id, {comment: req.body.comment}, function (err, numberAffected, raw) {
           if(err === null){
               res.send(200);
           }
        });
    });

    return apiRouter;
};


