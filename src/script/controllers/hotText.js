// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("hottext", function () {
			return {
				restrict: "E",
				scope: true,
				controller: function ($scope, $element, $attrs, $transclude, hottextinteractionEvents, hottextEvents){
					$scope.identifier = $attrs.identifier;
					$scope.type = "hottext";

					this.select = function(){
						$scope.$emit(hottextEvents.select, $scope.identifier);
					}
				}
			};
		});