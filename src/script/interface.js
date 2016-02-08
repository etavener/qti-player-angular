angular.module("contentplayer")
.directive('interface', ['$http', 'interfaceEvents', function(http, interfaceEvents){
	return {
		restrict: 'C',
		transclude: true,
		replace: true,
		scope: true,
		templateUrl: 'partials/interface.html',
		link: function(scope, ele, attr){
			scope.$watch('nextDisabled', function(value){
				console.log('nextDisabled', 'changed', value);
			});
		},
		controller: function($scope, $element, $attrs, $transclude, $http, $compile, $location, $timeout, interfaceEvents, assessmentTestData, assessmentitem, ResponseManager){

			$scope.search = '';

			var controller = this;
			var testData = {};
			var prevObj = {};
			$scope.currObj = {};
			$scope.currentId = '';
			$scope.href = '';
			$scope.titles = [];
			$scope.totalActivities = 0;
			$scope.currentActivity = 0;
			$scope.lastScreen = false;
			$scope.firstScreen = false;
			$scope.numberResponded = 0;
			$scope.nextDisabled = false;

			//RESPONSES WILL BE STORED IN AN LMS IN FUTURE.........
			/*$scope.savedResponses = {};
			$scope.$on(interfaceEvents.saveResponses, function(event, data){
				//console.log('receiveResponses', data);
				$scope.savedResponses[$scope.currentId] = data.responses;
				$scope.numberResponded = data.numberResponded;
				$scope.nextDisabled = (!$scope.allowSkipping && $scope.numberResponded != $scope.savedResponses[$scope.currentId].length) ? true : false ;
				console.log('$scope.nextDisabled', $scope.nextDisabled);
				$scope.$digest();
			});*/

			this.initialise = function(){
				var paramId = $location.search().id || "";
				if(paramId != undefined){
					$scope.currentId = paramId;
				}

				assessmentTestData.loadAssessmenetData ("data/Assessment_branching.xml", paramId).then(function(data) {
    				controller.loadAssessmentItem( data );
    			});
			};

			this.loadAssessmentItem = function( testUrl ){
				assessmentitem.loadXML(testUrl).then(function(data) {
    				controller.displayActivity();
    				$scope.titles = assessmentTestData.getBreadCrumb();
    			});
			};

			this.testLoaded = function(xml){
				controller.testData = $.xml2json(xml, true);
                controller.getActivity();
			};
			$scope.next = function(){
				controller.loadAssessmentItem ( assessmentTestData.getNextAssessmentItemRef("Next") );
			};
			$scope.back = function(){
				controller.loadAssessmentItem ( assessmentTestData.getNextAssessmentItemRef("Back") );
			};
			
			/*
			this.updateNavigation = function(){
			};*/

			this.getActivity = function(searchType){
				$scope.search = searchType || '';
				//defaults
				//get the data from the Assessment.xml file.(result contains information about the activity.)
				var result = this.loopNodes(this.testData);
				if(result)
				{
					$scope.lastScreen = result.lastNode;
					$scope.firstScreen = result.firstNode;

					//$scope.nextDisabled = ($scope.allowSkipping) ? false : true;
					//upate scope from the result object.
					//$scope.nextDisabled = (result.lastNode) ? true : false;
					//$scope.backDisabled = (result.firstNode) ? true : false;
					//set progress data
					$scope.totalActivities = result.total;
					$scope.currentActivity = Number(result.index)+1;
					//set activity data
					$scope.currentId = result.identifier;
					$scope.href = result.href;
					//update the url in the address bar to show where we are...
					$location.search('id', $scope.currentId);
					//start loading
					assessmentitem.loadXML(result.href).then(function(data) {
    					controller.displayActivity();
    				});

				}else{
					//there has been an error getting the activity requested......
					throw 'The Activity could not be found in the assessment xml file.';
				}
			};

			this.loopNodes = function(obj, level, result){
				var node, childNode, nodeLength, nodeIndex;

				if(level != undefined){
					level++;
				}else{
					level = 0;
				}

				for (var nodeName in obj){
					node = obj[nodeName];
					//check that it is a valid array object
				    if (typeof node == "object" && node !== null && $.isArray(node)){
				    	//all xml nodes are converted to an object array...
				    	for(var a in node){
							//if we have not received a result and any preconditions are met.
				    		if(!result && this.preCondition(node[a]))
				    		{
				    			//loop through child nodes....
				    			result = this.loopNodes(node[a], level, result);
				    			if(result)
								{
									if(result.firstNode && a != 0) result.firstNode = false;
									if(result.lastNode && a != node.length-1) result.lastNode = false;
								}
								//check current node....
				    			switch(nodeName){
				    				case 'testPart':
				    					//main test file...
				    					break;
				    				case 'assessmentSection':
				    					//
				    					result = this.checkAssessmentSection(node[a], level, result);
				    					break;
				    				case 'assessmentItemRef':
				    					//link to an assessment item
				    					result = this.checkAssessmentItemRef(node[a], result, a, node.length);
				    					break;
				    				case 'itemSessionControl':
				    					this.itemSessionControl(node[a]);
				    				default:
				    			}

				        	}
				    	}
					}
				}
			    return result;
			}

			this.checkExpression = function(obj, result){
				if(!result) result = {};
				var baseValue, variable, response, splitId;
				for (var prop in obj){
					var currObj = obj[prop];
					if (typeof currObj == "object" && currObj !== null && $.isArray(currObj))
					{
						for(var a in currObj){
							//check objects children
							result = this.checkExpression(currObj[a], result);
							//check current object
							switch(prop){
								case 'not':
									//toggle the result based on it's current value...
									result.success = (result.success) ? false : true;
									break;
								case 'match':
									if(result){
										//get the response and then check it against the basevalue
										responseValue = ResponseManager.getResponseValue(result.responseId);
										if(responseValue) result.success = (responseValue == result.baseValue) ? true : false;
									}
									break;
								case 'variable':
									//get the identifiers
									splitId = currObj[a].identifier.split('.');
									result.activityId = splitId[0];
									result.responseId = splitId[1];
									break;
								case 'baseValue':
									//get the value to make comparisons against
									result.baseValue = currObj[a].text;
									break;
								default:
							}
						}
					}
				}
				return result;
			}

			this.itemSessionControl = function(obj){
				$scope.allowSkipping = (obj.allowSkipping == 'true');
				$scope.validateResponses = (obj.validateResponses == 'true');

				$scope.nextDisabled = ($scope.allowSkipping) ? false : true;

				if(ResponseManager.validResponses)
				{
					//need to check reponses......
				}

			}

			this.branchRule = function(obj){
				var path = '';
				if(obj.branchRule)
				{
					for(var b in obj.branchRule)
						if(this.checkExpression(obj.branchRule[b]).success) path = obj.branchRule[b].target;
				}
				return path;
			}

			this.preCondition = function(obj){
				var show = true;
				if(obj.preCondition)
				{
					for(var c in obj.preCondition)
						if(!this.checkExpression(obj.preCondition[c]).success) show = false;
				}
				return show
			}

			this.checkAssessmentSection = function(assessmentSection, level, result){
				if(result){
					$scope.titles[level-1] = assessmentSection.title;
				}else{
					result = undefined;
				}
				return result;
			}

			this.checkAssessmentItemRef = function(assessmentItemRef, result, position, length){
				if($scope.currentId == assessmentItemRef.identifier || $scope.currentId == ''){
					switch($scope.search){
						case 'next':
							//set the currentId to either ''(default) or a branch target
							$scope.currentId = this.branchRule(assessmentItemRef);
							$scope.search = '';
							break;
						case 'back':
							if(this.previousActivity) result = this.previousActivity;
							break;
						default:
							result = this.getAssessmentRef(assessmentItemRef, position, length);
							break;
					}
				}
				//store the previous acitivity in case we need to go back one (used for prev)
				this.previousActivity = this.getAssessmentRef(assessmentItemRef, position, length);
				return result
			}

			this.getAssessmentRef = function(obj, position, length){
				var result = {};
				result.found = true;
				result.href = obj.href;
				result.identifier = obj.identifier;
				result.index = position;
				result.total = length;
				result.firstNode = (position == 0) ? true : false;
				result.lastNode = (position == length-1) ? true : false;

				return result;
			}

			this.displayActivity = function(){
				ResponseManager.setActivityIdentifier(assessmentTestData.getActivityIdentifier()); // setting the activity identifier in the response manager
				ResponseManager.declareResponses(assessmentitem.responseDeclarationsXML());

				var x = $compile(assessmentitem.itemBodyXML());
				var y = x($scope);
				$element.children('[ng-transclude]').html(y);
			}

			this.initialise();
	    }
	};

}]);





