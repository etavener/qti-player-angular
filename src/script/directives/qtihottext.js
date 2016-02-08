angular.module("contentplayer")
	.directive("qtihottext", function () {
		return {
			restrict: "C",
			scope: true,
			transclude: true,
			replace: true,
			require: '^hottext',
			templateUrl: 'partials/templates/hottext.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	element.find("label").bind('click', function(event) {
							controller.select();
						})
		            }
		        };
		    }
		};
	});