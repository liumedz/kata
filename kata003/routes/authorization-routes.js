module.exports = function(express, clames, models, crypto){

    var authorization = express.Router();

    authorization.use(function(req, res, next) {
        next();
    });

    authorization.get('/login', function(req, res, next) {
        res.render('authentication/login');
    });

    authorization.post('/login', function(req, res, next) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(req.body.password);
        models.userModel.User.findOne({email: req.body.email, password: shaSum.digest('hex')}).populate('roles').exec(function (err, user) {
            req.session.user = {
                email: user.email,
                roles: user.roles.map(function (item) { return item.name }),
            };

            req.session.user.permissions = [];

            user.roles.forEach(function(role){
                role.permissions.forEach(function(permission){
                    var index =  req.session.user.permissions.indexOf(permission);
                    if(index < 0){
                        req.session.user.permissions.push(permission);
                    }
                });
            });

            if(req.session.user.roles){
                var index = req.session.user.roles.indexOf('admin');
                if(index > -1){
                    res.redirect('/admin');
                }
                else{
                    res.redirect('/');
                }
            }
        });
    });

    return authorization;
};


