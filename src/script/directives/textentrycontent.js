angular.module("contentplayer")
	.directive("textentrycontent", function () {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			scope: true,
			templateUrl: 'partials/templates/textentrycontent.html',
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