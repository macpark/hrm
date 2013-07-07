'use strict';

/* Filters */

angular.module('hrmFilters', []).filter('checkmark', function() {
	return function(input) {
		return input ? '\u2713' : '\u2718';
	};
}).filter('notDate', function() {
	return function(date_str) {
		return date_str != '0000-00-00' ? date_str : ''
	};
});
