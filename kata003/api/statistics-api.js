module.exports = function(express, authorization, permissions, models){

    var isPermittedView = authorization.ensureRequest.isPermitted(permissions.admin);

    var apiRouter = express.Router();


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

    return apiRouter;
};


