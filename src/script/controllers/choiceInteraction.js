// Please note that this is a directive because QTI elements but this directive behaves as a controller.
angular.module("contentplayer")
	.directive("choiceinteraction", function (simplechoiceEvents) {
			return {
				restrict: "E",
				scope: true,
				controller: function($scope, $element, $attrs, $transclude, assessmentEvents, simplechoiceEvents, ResponseManager){
					$scope.responseidentifier =  $attrs.responseidentifier;
					$scope.shuffle = $attrs.shuffle;
					$scope.maxChoices = $attrs.maxChoices;
					$scope.type = "choiceinteraction";
					
					var controller = this;
					$scope.$on(simplechoiceEvents.select, function(event, data){
						controller.choiceinteractionSelected(String(data));
					});

					this.init = function(){
						this.setprompt();
					}

					this.choiceinteractionSelected = function(value){
						ResponseManager.setResponseValue($scope.responseidentifier, value);
					}

					this.setprompt = function(){
						var promptEl = $element.find('prompt');
		            	if(promptEl) $scope.prompthtml = promptEl.html();
						if(promptEl) promptEl.remove();
					}
				}
			};
		});