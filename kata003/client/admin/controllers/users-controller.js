'use strict';


app.controller('usersController', [ '$scope', 'usersResource', function ($scope, usersResource) {
    $scope.users = usersResource.query();
    $scope.user = {};

    $scope.onSave = function(user){

        if($scope.users.indexOf(user) === -1){
            usersResource.save(user);
        }
        else{
            var _id = user._id;
            delete user._id;
            usersResource.update({_id: _id}, user);
        }

        $scope.users = usersResource.query();
    };

    $scope.onEdit = function(user){
        $scope.user = user;
    };
}]);