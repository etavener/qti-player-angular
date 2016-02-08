angular.module("contentplayer")
	.directive("qticheckboxMS", function ($compile) {
		return {
			restrict: 'C',
			transclude: true,
			replace: true,
			scope: true,
			require: '^simplematchset',
			templateUrl: 'partials/templates/checkboxlist.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            }
		        };
		    }
		};
	})