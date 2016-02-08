angular.module("contentplayer")
	.directive("itembody", ["$sce", function (sce) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			templateUrl: 'partials/templates/itembody.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	var transludeContent = element.find('.activity_body');
		            	//get child elements of the translude element.
		            	var rubric = transludeContent.children('rubricBlock');
		            	var infocontrol = transludeContent.children('infoControl');
		            	//add the data to the scope (so we can use in template)
		            	if(rubric){
							scope.instruction = sce.trustAsHtml (rubric.html());
		            	}
		            	if(infocontrol){
							scope.hint = infocontrol.html();
		            	}

						//remove elements (we have the data in the scope now)
						if(rubric) rubric.remove();
						if(infocontrol) infocontrol.remove();

		            }
		        };
		    }
		};
	}]);