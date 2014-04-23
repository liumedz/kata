'use strict';

app.controller('ratingTypesController', ['$scope', '$location' , '$routeParams', 'customersResource', function ($scope, $location, $routeParams, customersResource) {

    var load = function() {
        customersResource.get({ _id: $routeParams._id }).$promise.then(function(customer) {
            $scope.customer = customer;
            $scope.department = customer.departments.filter(function(item) {
                return item._id === $routeParams._departmentId;
            })[0];
            $scope.object = $scope.department.objects.filter(function(item) {
                return item._id === $routeParams._objectId;
            })[0];
            selectFirst();
        });
    };

    var selectFirst = function() {
        if ($scope.object.ratingTypes.length > 0) {
            $scope.ratingType = $scope.object.ratingTypes[0];
        } else {
            $scope.object.ratingTypes.push({});
        }
        $scope.ratingType = $scope.object.ratingTypes[0];
    };

    $scope.onAdd = function(){
        $scope.ratingType = {};
        $scope.object.ratingTypes.push($scope.ratingType);
    };

    $scope.onSave = function(customer){
        var _id = customer._id;
        delete customer._id;
        customersResource.update({ _id: _id }, customer);
        load();
    };

    $scope.onEdit = function(ratingType){
        $scope.ratingType = ratingType;
    };

    $scope.onDelete = function(ratingType){
        var index = $scope.object.ratingTypes.indexOf(ratingType);
        $scope.object.ratingTypes.splice(index, 1);
        var _id = $scope.customer._id;
        delete $scope.customer._id;
        customersResource.update({ _id: _id }, $scope.customer);
        load();
    };

    load();
}]);