'use strict';


app.controller('usersController', [ '$scope', 'usersResource', 'customersResource', function ($scope, usersResource, customersResource) {

    var load = function() {
         usersResource.query().$promise.then(function(users){
            $scope.users = users;
            $scope.user = {};
            selectFirst();
            loadCustomers();
        });
    };

    var loadCustomers = function(){
        customersResource.query().$promise.then(function(customers){
            $scope.customers = customers;
        });
    };

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

    load();

}]);