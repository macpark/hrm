'use strict';

/* Services */

angular.module('hrmServices', ['ngResource']).
    factory('Employee', function($resource){
  return $resource('employees/employee.php?emp_id=:empId', {}, {
    query: {method:'GET', params:{empId:'employeesList'}, isArray:true}
  });
});
