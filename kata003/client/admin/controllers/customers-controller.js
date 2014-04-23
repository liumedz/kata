'use strict';


app.controller('customersController', ['$scope', '$location', 'customersResource', function ($scope, $location, customersResource) {

    customersResource.query().$promise.then(function(customers){
        $scope.customers = customers;
        $scope.customer = $scope.customers.length > 0 ? $scope.customers[0] : {};
    });


    $scope.onAdd = function(){
        $scope.customer = {};
        $scope.customers.push($scope.customer);
    };

    $scope.onSave = function(customer){

        if(customer._id === undefined){
            customersResource.save(customer);
        }
        else{
            var _id = customer._id;
            delete customer._id;
            customersResource.update({ _id: _id }, customer);
        }
    };

    $scope.onEdit = function(customer){
        $scope.customer = customer;
    };

    $scope.onDepartments = function(customer){
        $location.url('/admin/customers/' + customer._id + '/departments');
    };
}]);