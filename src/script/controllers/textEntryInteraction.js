angular.module("contentplayer")
    .directive("textentryinteraction", function () {
			return {
				restrict: "E",
				scope: true,
				controller: function($scope, $element, $attrs, $transclude, ResponseManager){
					var controller = this;
					
					$scope.responseidentifier =  $attrs.responseidentifier;
					$scope.type = "textentryinteraction_" + $scope.responseidentifier;
					$scope.response = '';

					var timer;				
					$element.on ("keyup", function () {
						// wait half a second if user finished typing before firing an event.
						if ( timer )
							clearTimeout(timer);							
						controller.elementValue = this.value;
				        timer = setTimeout ( function () {
			        	   controller.sendResponseTextEntry ('response::textentry', controller.elementValue);
			        	},500);
				        
					});

					 this.sendResponseTextEntry = function ( value ) {
						ResponseManager.setResponseValue($scope.responseidentifier, controller.value);
					};


					$scope.$on('response::scope', function(event, data){
						console.log('response::scope received', $scope.responseidentifier, data);
					});
				}
			};
		});
