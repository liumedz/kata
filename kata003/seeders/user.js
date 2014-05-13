module.exports = function (models, crypto) {

    var start = function () {

        models.userModel.User.findOne({ email: 'admin@beirate.com' }, function (err, user) {

            console.log(JSON.stringify(err));
            console.log(JSON.stringify(user));

            
            if (user === null) {
                var newUser = new models.userModel.User();
                newUser.email = "admin@beirate.com";
                newUser.password = "beirate123";
                newUser.firstName = "Liutauras";
                newUser.lastName = "Medziunas";
                var shaSum = crypto.createHash('sha256');
                shaSum.update(newUser.password);
                newUser.password = shaSum.digest('hex');

                models.roleModel.Role.findOne({ name: 'admin' }, function(err, role) {
                    newUser.roles.push(role._id);
                    newUser.save(function (err, data, count) {
                        console.log(JSON.stringify(err));
                        console.log(JSON.stringify(user));
                    });
                });
            }
        });
    };

    return{
        start: start
    };
};