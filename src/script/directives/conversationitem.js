angular.module("contentplayer")
	.directive("conversationitem", function () {
		return {
			restrict: 'C',
			transclude: true,
			replace: true,
			templateUrl: 'partials/templates/conversationitem.html',
			compile: function(element, attributes){
		        return {
		            pre: function(scope, element, attributes, controller, transcludeFn){
		            },
		            post: function(scope, element, attributes, controller, transcludeFn){
		            	if(element.hasClass('ltr'))
		            	{
		            		element.addClass('dialog--alternate');
		            	}
		            	var transludeContent = element.find('.dialog__body');
		            	//get child elements of the translude element.
		            	var img = transludeContent.children('img');
		            	var nme = transludeContent.children('span');
		            	//add the data to the scope (so we can use in template)
		            	if(img){
							scope.img_src = img.attr('src');
							scope.img_alt = img.attr('alt');
		            	}
		            	if(nme){
							scope.nme = nme.html();
		            	}

						//remove elements (we have the data in the scope now)
						if(img) img.remove();
						if(nme) nme.remove();

		            }
		        };
		    }
		};
	});