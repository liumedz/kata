module.exports = function(express, authorization, clames, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(clames.webIndex);

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

    apiRouter.get('/statistics', function (req, res) {
        models.customerModel.Customer.findOne(function (err, customer) {
            models.ratingModel.Rating.find({ c: customer.c }, function (err, ratings) {
                var statistics = ratings.map(function (rating) {

                    var newDepartment = {};
                    var newObject = {};
                    var newRating = {};

                    customer.departments.filter(function (item) {
                        return item.d === rating.d
                    }).forEach(function (item) {
                            newDepartment = item;
                            item.objects.filter(function (item) {
                                return item.o === rating.o;
                            }).forEach(function (item) {
                                    newObject = item;
                                    item.ratingTypes.filter(function (item) {
                                        return item.r === rating.r;
                                    }).forEach(function(item){
                                            newRating = item
                                        });
                                });
                        });


                    return {
                        customer: {
                            c: customer.c,
                            name: customer.name,
                            code: customer.code,
                            address: customer.address
                        },
                        department: {
                            d: newDepartment.d,
                            name: newDepartment.name,
                            code: newDepartment.code,
                            address: newDepartment.address
                        },
                        object: {
                            o: newObject.o,
                            name: newObject.name
                        },
                        rating: {
                            r: newRating.r,
                            name: newRating.name
                        }
                    };

                });
                res.send(statistics);
            });
        });
    });

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


