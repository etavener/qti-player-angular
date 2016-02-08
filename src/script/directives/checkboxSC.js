angular.module("contentplayer")
	.directive("checkboxSC", function (simplechoiceEvents) {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			scope: true,
			templateUrl: 'partials/templates/checkboxitem.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	element.find("input").bind('click', function(event) {
							scope.$emit(simplechoiceEvents.select, scope.identifier);
						});
		            }
		        };
		    }
		};
	});