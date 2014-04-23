    $routeProvider.when('/customers/:customerid/adddepartment',
        {
            templateUrl: 'templates/department-template.html',
            controller: 'editCollectionCtrl',
            resolve: {
                resource: ['$routeParams', 'crmServoce', function ($routeParams, crmServoce) {
                    crmServoce.init("customers");

                    var Load = function() {
                        return {
                            data: crmServoce.get($routeParams.customerid)
                        }
                    }

                    return {
                        Load: Load,
                        save: crmServoce.save,
                        delete: crmServoce.delete
                    };
                }]
            }
        })
