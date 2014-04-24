'use strict';


app.controller('usersController', [ '$scope', 'usersResource', function ($scope, usersResource) {

    var load = function() {
         usersResource.query().$promise.then(function(users){
            $scope.users = users;
            $scope.user = {};
            selectFirst();
        });

    }

    var selectFirst = function() {
        if ($scope.users.length > 0) {
            $scope.user = $scope.users[0];
        } else {
            $scope.users.push({});
        }
        $scope.user = $scope.users[0];
    };

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

    load();

}]);