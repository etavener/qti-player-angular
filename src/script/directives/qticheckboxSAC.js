angular.module("contentplayer")
	.directive("qticheckboxSAC", function ($compile) {
		return {
			restrict: 'C',
			transclude: true,
			replace: true,
			scope: true,
			require: '^simpleassociablechoice',
			templateUrl: 'partials/templates/checkboxlistitem.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	element.find("input").bind('click', function(event) {
							controller.select();
						});
		            }
		        };
		    }
		};
	});