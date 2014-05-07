'use strict';

app.factory('statisticsService', ['$q', 'statisticsResource', function($q, statisticsResource) {

    var dataSourceDeferred = $q.defer();

    statisticsResource.query({}, function(data){

        var columns  = [  {name: 'c', title: 'C'},
            {name: 'customerName', title: 'Customer'},
            {name: 'customerCode', title: 'Customer Code'},
            {name: 'customerAddress', title: 'Address'},
            {name: 'd', title: 'D'},
            {name: 'departmentName', title: 'Department Name'},
            {name: 'departmentCode', title: 'Department Code'},
            {name: 'o', title: 'O'},
            {name: 'objectName', title: 'Object Name'},
            {name: 'r', title: 'R'},
            {name: 'ratingName', title: 'Rating name'}
        ];

        var statistics = data.map(function(item){
            return {
                c: item.customer.c,
                customerName: item.customer.name,
                customerCode: item.customer.code,
                customerAddress: item.customer.address,
                d: item.department.d,
                departmentName: item.department.name,
                departmentCode: item.department.code,
                o: item.object.o,
                objectName: item.object.name,
                r: item.rating.r,
                ratingName: item.rating.name
            }
        });

        dataSourceDeferred.resolve({columns: columns, rows: statistics});
    });

    return {
        dataSource: dataSourceDeferred.promise
    }

}]);
