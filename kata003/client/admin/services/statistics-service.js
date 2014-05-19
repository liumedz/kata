'use strict';

app.factory('statisticsService', ['$q', 'statisticsResource', function($q, statisticsResource) {

    var dataSourceDeferred = $q.defer();
    var load = function(filter){


        statisticsResource.query(filter, function(data){

            var columns  = [
                //         {name: 'c', title: global.statisticsTableColumns.c},
                {name: 'customerName', title: global.statisticsTableColumns.customerName},
                {name: 'customerCode', title: global.statisticsTableColumns.customerCode},
                {name: 'customerAddress', title: global.statisticsTableColumns.customerAddress},
                //        {name: 'd', title: global.statisticsTableColumns.d},
                {name: 'departmentName', title: global.statisticsTableColumns.departmentName},
                {name: 'departmentCode', title: global.statisticsTableColumns.departmentCode},
                //       {name: 'o', title: global.statisticsTableColumns.o},
                {name: 'objectName', title: global.statisticsTableColumns.objectName},
                //        {name: 'r', title: global.statisticsTableColumns.r},
                { name: 'created', title: global.statisticsTableColumns.created },
                {name: 'ratingName', title: global.statisticsTableColumns.ratingTypeName}
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
                    created: Date.parse(item.rating.created),
                    ratingName: item.rating.name
                };
            });

            dataSourceDeferred.resolve({columns: columns, rows: statistics});
        });
    }




    return {
        dataSource: dataSourceDeferred.promise,
        load: load
    }

}]);
