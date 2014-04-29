'use strict';


app.controller('usersController', [ '$scope', 'usersResource', 'customersResource', 'rolesResource', function ($scope, usersResource, customersResource, rolesResource) {


    var load = function() {
         usersResource.query().$promise.then(function(users){
            $scope.users = users;
            $scope.user = {};
            selectFirst();
            loadCustomers();
            loadRoles();
        });
    };

    var loadCustomers = function(){
        $scope.customers = customersResource.query();
    };

    var loadRoles = function(){
        $scope.roles = rolesResource.query();
    }

    var selectFirst = function() {
        if ($scope.users.length > 0) {
            $scope.user = $scope.users[0];
        } else {
            $scope.users.push({});
        }
        $scope.user = $scope.users[0];
    };

    $scope.onAdd = function(){
        $scope.user = {};
        $scope.users.push($scope.user);
    };

    $scope.onSave = function(user){
        if(!user._id){
            usersResource.save(user);
        }
        else{
            var _id = user._id;
            delete user._id;
            usersResource.update({ _id: _id }, user);
        }
        load()
    };

    $scope.onEdit = function(user){
        $scope.user = user;
    };

    $scope.onDelete = function (user) {
        usersResource.delete(user);
        load();
    };

    $scope.isAssigned = function(customer){
        return $scope.user.customers.filter(function(item){
            return item == customer._id;
        }).length > 0;
    };

    $scope.onAssign = function (customer) {

        var currentCustomer = $scope.user.customers.filter(function(item){
            return item == customer._id;
        });

        if(currentCustomer.length > 0){
            $scope.user.customers.splice($scope.user.customers.indexOf(currentCustomer[0]), 1);
        }
        else{
            $scope.user.customers.push(customer._id);
        }
        var _id = $scope.user._id;
        delete $scope.user._id;
        usersResource.update({ _id: _id }, $scope.user);
        load();
        loadCustomers();
    };

    $scope.isAssignedRole = function(role){
        if($scope.user.roles){
            return $scope.user.roles.filter(function(item){
                return item === role._id;
            }).length > 0;
        }
        else{
            return false;
        }
    };

    $scope.onAssignRole = function (role) {

        if(!$scope.user.roles){
            $scope.user.roles = [];
        }

        var index = $scope.user.roles.indexOf(role._id);
        if(index > -1){
            $scope.user.roles.splice(index, 1);
        }
        else{
            $scope.user.roles.push(role._id);
        }

        var _id = $scope.user._id;
        delete $scope.user._id;
        usersResource.update({ _id: _id }, $scope.user);

        load();
    };

    load();

}]);