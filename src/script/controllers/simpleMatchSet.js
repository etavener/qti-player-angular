// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("simplematchset", function () {
		return {
			restrict: "E",
			scope: true,
			controller: function($scope, $element, $attrs, $transclude, sacEvents, matchinteractionEvents){
				$scope.type = 'simplematchset';

				$scope.$on(sacEvents.click, function(event, data){
					console.log('simplematchset', data);
				});
		}
	};
});