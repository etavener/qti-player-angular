angular.module("contentplayer")
	.directive("conversation", function ($compile) {
		return {
			restrict: 'C',
			transclude: true,
			replace: true,
			templateUrl: 'partials/templates/conversation.html',
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