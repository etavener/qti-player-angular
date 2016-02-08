// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("hottextinteraction", function () {
		return {
			restrict: "E",
			scope: true,
			controller: function($scope, $element, $attrs, $transclude, hottextinteractionEvents, hottextEvents, ResponseManager){
				$scope.responseidentifier =  $attrs.responseidentifier;
				$scope.type = "hottextinteraction";
				$scope.response = '';

				$scope.$on(hottextEvents.select, function(event, data){
					ResponseManager.setResponseValue($scope.responseidentifier, data);
					console.log('response::scope received', $scope.responseidentifier, data);
				});
			}
		};
	});