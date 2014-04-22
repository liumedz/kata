'use strict';


app.controller('customersController', ['$scope', 'customersResource', function ($scope, customersResource) {
    $scope.customers = customersResource.query();
    $scope.customer = {};

    $scope.onSave = function(customer){

        if($scope.customers.indexOf(customer) === -1){
            customersResource.save(customer);
        }
        else{
            var _id = customer._id;
            delete customer._id;
            customersResource.update({ _id: _id }, customer);
        }

        $scope.customers = customersResource.query();
    };

    $scope.onEdit = function(customer){
        $scope.customer = customer;
    };
}]);