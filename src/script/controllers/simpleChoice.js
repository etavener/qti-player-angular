// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
.directive("simplechoice", function () {
		return {
			restrict: "E",
			scope: true,
			controller: function ($scope, $element, $attrs, $transclude, simplechoiceEvents){
				$scope.type = "simplechoice";
				$scope.identifier = $attrs.identifier;
				$scope.uid = $attrs.identifier;

				this.simplechoiceSelected = function(){
					$scope.$emit(simplechoiceEvents.select, $scope.identifier);
				}
			}
		};
	});