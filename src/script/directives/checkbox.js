angular.module("contentplayer")
	.directive("checkbox", function () {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			scope: true,
			require: '^choiceinteraction',
			templateUrl: 'partials/templates/checkbox.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	controller.init();
		            }
		        };
		    }
		};
	});