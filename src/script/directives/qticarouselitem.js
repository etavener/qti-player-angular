angular.module("contentplayer")
	.directive("qticarouselitem", function ($compile) {
		return {
			restrict: 'C',
			transclude: true,
			replace: true,
			scope: true,
			templateUrl: 'partials/templates/carouselitem.html',
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