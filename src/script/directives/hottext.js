angular.module("contentplayer")
	.directive("hottext", function () {
		return {
			restrict: "E",
			scope: true,
			transclude: true,
			replace: true,
			templateUrl: 'partials/templates/hottext.html',
			link: function (scope, element, attributes){
				element.find("label").bind('click', function(event) {
					scope.$emit('response::scope', scope.identifier);
				});
			},
			controller: function ($scope, $element, $attrs, $transclude){
				$scope.identifier = $attrs.identifier;
			}
		};
	});