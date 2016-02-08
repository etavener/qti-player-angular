angular.module("contentplayer")
	.directive("textentryinteractions", function () {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			scope: true,
			templateUrl: 'partials/templates/textentryinteractions.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	
		            }
		        };
		    }
		};
	});