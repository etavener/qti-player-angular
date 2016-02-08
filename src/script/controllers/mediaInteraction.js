// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("mediainteraction", function () {
			return {
				restrict: "E",
				scope: true,
				transclude: true,
				replace: true,
				template: "<div ng-transclude='parent' />",
				controller: function ($scope, $element, $attrs, $transclude, responseManager){
					$scope.responseidentifier =  $attrs.responseidentifier;
					//$scope.shuffle = $attrs.shuffle;
					//$scope.maxChoices = $attrs.maxChoices;
					$scope.type = "mediainteraction";
					$scope.response = '';

					$scope.$on('response::scope', function(event, data){
						console.log('response::scope received', $scope.responseidentifier, data);
						responseManager.setResponse($scope.responseidentifier, data);
					});
				}
			};
});