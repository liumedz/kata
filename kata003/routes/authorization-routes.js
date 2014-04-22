module.exports = function(express, clames){

    var authorization = express.Router();

    authorization.use(function(req, res, next) {
        next();
    });

    authorization.get('/login', function(req, res, next) {
        res.render('authentication/login');
    });

    authorization.post('/login', function(req, res, next) {

        req.session.user = {
            username: 'root',
            role: 'admin',
            permissions: [ clames.webIndex ]
        };

        switch ( req.session.user.role){
            case 'user':
                res.redirect('/analytics');
                break;
            case 'admin':
                res.redirect('/admin');
                break;
            default:
                res.redirect('/');
        }
    });

    return authorization;
};


