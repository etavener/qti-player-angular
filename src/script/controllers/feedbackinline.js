// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("feedbackinline", function () {
			return {
				restrict: "E",
				scope: true,
				transclude: true,
				replace: true,
				template: "<div ng-transclude='parent' />",
				compile: function(element, attributes){
			        return {
			            pre: function(scope, element, attributes, controller, transcludeFn){
			            },
			            post: function(scope, element, attributes, controller, transcludeFn){
			            	controller.init();
			            }
			        };
			    },
				controller: function ($scope, $element, $attrs, $transclude){
					$scope.type = "feedbackinline";
					$scope.identifier = $attrs.identifier;
					$scope.hide = true;

					this.init = function(){
	            		if($attrs.showhide === 'hide')
	            		{
	            			scope.hide = false;
	            		}
	            		this.update();
					}
					this.update = function(){
						if($scope.hide)
						{
							$element.hide();
						}else{
							$element.show();
						}
					}
				}
			};
});