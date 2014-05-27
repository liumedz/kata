module.exports = function(express, clames, models, crypto){

    var authorization = express.Router();

    authorization.use(function(req, res, next) {
        next();
    });

    authorization.get('/login', function(req, res, next) {
        res.render('authentication/login', {error: ''});
    });

    authorization.post('/login', function(req, res, next) {

        if(req.body.password === '' && req.body.email  === '' ){
            res.render('authentication/login', {error: "Incorrect email or password!"});
            return;
        }

        var email = req.body.email;
        var password = req.body.password;

        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        models.userModel.User.findOne({email: email, password: shaSum.digest('hex')}).populate('roles').exec(function (err, user) {

            if(err !== null || user === null){
                res.render('authentication/login', {error: "Incorrect email or password!"});
                return;
            }

            req.session.user = {
                email: user.email,
                roles: user.roles.map(function (item) { return item.name })
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

                var index = req.session.user.roles.indexOf('analytics');
                if(index > -1){
                    res.redirect('/analytics');
                    return;
                }

                var index = req.session.user.roles.indexOf('admin');
                if(index > -1){
                    res.redirect('/admin');
                    return;
                }

                res.redirect('/');
            }
        });
    });

    authorization.get('/logout', function(req, res, next) {
        req.session.user = null;
        res.redirect('/login');
    });

    return authorization;
};


