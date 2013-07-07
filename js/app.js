'use strict';

/* App Module */

angular.module('hrm', ['hrmFilters', 'hrmServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/employees', {templateUrl: 'partials/employee-list.html',   controller: EmployeeListCtrl}).
      when('/employees/:empId', {templateUrl: 'partials/employee-detail.html', controller: EmployeeDetailCtrl}).
      otherwise({redirectTo: '/employees'});
}]);
