module.exports = function(express, authorization){

    var isPermittedView = authorization.ensureRequest.isPermitted('home:view');
    var isPermittedEdit = authorization.ensureRequest.isPermitted('home:edit');

    var authorization = express.Router();

    authorization.use(function(req, res, next) {
        next();
    });

    authorization.get('/login', function(req, res, next) {
        res.render('login');
    });

    authorization.post('/login', function(req, res, next) {
        req.session.user = {
            username: 'root',
            roles: ['admin'],
            permissions: [ 'home:*' ]
        };
        res.redirect('/');
    });

    authorization.get('/', isPermittedView, function(req, res, next) {
        res.render('index');
    });

    return authorization;
};


