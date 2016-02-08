// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("matchinteraction", function () {
		return {
			restrict: "E",
			scope: true,
			controller: function($scope, $element, $attrs, $transclude, sacEvents, matchinteractionEvents){
				$scope.type = 'matchinteraction';
				$scope.responses = [];

				this.init = function(){

				}

				$scope.$on(sacEvents.select, function(event, data){
					console.log('matchinteraction selected', data);
				});
			}
		};
	});