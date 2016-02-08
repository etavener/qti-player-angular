angular.module("contentplayer")
	.directive("dropdown", function () {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			scope: true,
			require: '^choiceinteraction',
			templateUrl: 'partials/templates/dropdown.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){

		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	controller.init();

		            	element.bind('change', function(event) {
							controller.choiceinteractionSelected(scope.selectedItem);
						});
		            }
		        };
		    }
		};
	});