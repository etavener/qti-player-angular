// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("simpleassociablechoice", function () {
		return {
			restrict: "E",
			scope: true,
			controller: function($scope, $element, $attrs, $transclude, sacEvents, matchinteractionEvents){
				$scope.type = 'simpleAssociableChoice';
				$scope.identifier = $attrs.identifier;
				$scope.matchMax = $attrs.matchMax;
				$scope.selected = false;

				this.select = function(){
					$scope.$emit(sacEvents.select, $scope.identifier);
				}
				this.deselect = function(){
					$scope.$emit(sacEvents.deselect, $scope.identifier);
				}
				this.reset = function(){
					$scope.selected = false;
				}
			}
		};
	});