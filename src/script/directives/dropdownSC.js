angular.module("contentplayer")
	.directive("dropdownSC", function () {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			scope: true,
			templateUrl: 'partials/templates/dropdownitem.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            }
		        }
		    }
		};
	});