'use strict';

statistics.factory('statisticsService', ['$q', 'statisticsResource', function($q, statisticsResource) {

    var dataSource = {dataSourceDeferred: {}};
    var load = function(filter){


        statisticsResource.query(filter, function(data){

            dataSource.dataSourceDeferred = $q.defer();
            var columns  = [
                //         {name: 'c', title: global.statisticsTableColumns.c},
                {name: 'customerName', title: global.statisticsTableColumns.customerName},
                {name: 'customerCode', title: global.statisticsTableColumns.customerCode},
                {name: 'customerAddress', title: global.statisticsTableColumns.customerAddress},
                //        {name: 'd', title: global.statisticsTableColumns.d},
                {name: 'departmentName', title: global.statisticsTableColumns.departmentName},
                {name: 'departmentCode', title: global.statisticsTableColumns.departmentCode},
                {name: 'departmentAddress', title: global.statisticsTableColumns.departmentAddress},
                //       {name: 'o', title: global.statisticsTableColumns.o},
                {name: 'objectName', title: global.statisticsTableColumns.objectName},
                {name: 'r', title: global.statisticsTableColumns.r},
                {name: 'created', title: global.statisticsTableColumns.created },
                {name: 'ratingName', title: global.statisticsTableColumns.ratingTypeName},
                {name: 'comment', title: global.statisticsTableColumns.comment}
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
                    departmentAddress: item.department.address,
                    o: item.object.o,
                    objectName: item.object.name,
                    r: item.rating.r,
                    created: new Date(item.rating.created),
                    ratingName: item.rating.name,
                    clientInfo: item.rating.clientInfo,
                    comment: item.rating.comment

                };
            });


            dataSource.dataSourceDeferred.resolve({columns: columns, rows: statistics});
        });
    }




    return {
        dataSource: dataSource,
        load: load
    }

}]);
