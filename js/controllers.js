'use strict';

/* Controllers */

function EmployeeListCtrl($scope, Employee) {
  $scope.employees = Employee.query();
  $scope.orderProp = 'pos_code';

  $scope.filterByNotBirth = function(employee) {
    return employee.birth_md != 'Z'
  }
}
//EmployeeListCtrl.$inject = ['$scope', 'Employee'];

function EmployeeDetailCtrl($scope, $routeParams, Employee) {
  $scope.employee = Employee.get({empId: $routeParams.empId}, function(employee) {
    //$scope.photoUrl = employee.emp_id;
  });

  //$scope.setImage = function(imageUrl) {
    //$scope.mainImageUrl = imageUrl;
  //}
}
//EmployeeDetailCtrl.$inject = ['$scope', '$routeParams', 'Employee'];
