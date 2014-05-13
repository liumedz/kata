module.exports = function (models, permissions) {

    var start = function () {

        models.roleModel.Role.findOne({ name: 'admin' }, function (err, role) {

            console.log(JSON.stringify(err));
            console.log(JSON.stringify(role));

            if (role === null) {
                var newRole = new models.roleModel.Role();
                newRole.name = "admin";
                newRole.permissions = [];

                for (var key in permissions) {
                    newRole.permissions.push(permissions[key]);
                }

                newRole.save(function (err, data, count) {
                    console.log(JSON.stringify(err));
                    console.log(JSON.stringify(role));
                });
            }
        });
    };

    return {
        start: start
    };
};