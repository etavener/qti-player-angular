angular.module("contentplayer")
	.directive("qticarousellist", function ($compile) {
		return {
			restrict: 'C',
			transclude: true,
			replace: true,
			scope: true,
			templateUrl: 'partials/templates/carousel.html',
			controller: "flexcarusel",
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	controller.initSlider();
		            }
		        };
		    }
		};
	});