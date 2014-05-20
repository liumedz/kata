module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.webIndex);

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

        if(!req.query.fromDate && !req.query.toDate){
            res.send({error: 'Please set from and to dates'});
            return;
        }
        var fromDate = new Date(req.query.fromDate);
        var toDate = new Date(req.query.toDate);

        models.userModel.User.findOne({email: req.session.user.email}, function (err, user) {
            models.customerModel.Customer.find({_id: {$in: user.customers}}, function (err, customers) {

                var cs = customers.map(function(customer){
                    return customer.c;
                });

                if(req.query.c){
                    cs = cs.filter(function(item){
                        return item === parseInt(req.query.c);
                    });
                }

                models.ratingModel.Rating.find({c: {$in: cs},  created: {$gte: fromDate, $lt: toDate}}, function (err, ratings) {

                    if(err !== null){
                        res.send({error: 'Error'});
                        return;
                    }

                    var statistics = ratings.map(function (rating) {

                        var newCustomer = {};
                        var newDepartment = {};
                        var newObject = {};
                        var newRating = {};

                        customers.filter(function (item) {
                            return item.c === rating.c;
                        }).forEach(function (item) {
                            newCustomer = item,
                            item.departments.filter(function (item) {
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
                                        newRating = item;
                                    });
                                });
                            });
                        });

                        return {
                            customer: {
                                c: newCustomer.c,
                                name: newCustomer.name,
                                code: newCustomer.code,
                                address: newCustomer.address
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
                                created: rating.created,
                                r: newRating.r,
                                name: newRating.name
                            }
                        };

                    });
                    res.send(statistics);
                });
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


