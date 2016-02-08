angular.module("contentplayer")
	.directive("qtidiv", function () {
		return {
			restrict: "C",
			transclude: true,
			replace: true,
			templateUrl: 'partials/templates/div.html'
		};
	});