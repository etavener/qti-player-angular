angular.module("contentplayer")
  .service('Expressions', function ($http, $q, ResponseManager) {

  	var Expressions = this;
    var query = "";
    var variable = "";
    var baseValue = "";
    var exp = ""

    this.getParams = function ( obj ) {
    	query = ""; // reset the query
  		this.checkExpression ( $(obj) );
  		this.setQuery ();
    };

    this.setQuery = function () {
    	console.log ( variable, exp, baseValue );
    }

    this.getResponseValue = function ( identifier ) {
    	//$(variable).attr("identifier")
    	return ResponseManager.getResponseValue( identifier );
    }

    this.getExpression = function ( qtiExpression )
    {
    	switch ( qtiExpression ) {
    		case "match": 
    			return "==";
    		case "not":
    			return "!";
    		case "and": 
    			return "&&";
    		// TODO: Add more expressions
    		default: 
    			break;
    	}
    }

    this.checkExpression = function(obj, result){
		if(!result) result = {};
		var baseValue, variable, response, splitId;
		console.log ( typeof obj == "object" && obj !== null ) ;
		if (typeof obj == "object" && obj !== null )
		{
			for(var a in obj){
				console.log ( obj[a])

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
				
				return result;
		}

    this.htmlTree = function ( obj ) {        
        if (obj.hasChildNodes()) {
        	var child = obj.firstChild;
        		while (child) {
                    if ( child.nodeType === 1 ) {
                    	switch ( child.nodeName ) {
                    		case "variable":
                    			if ( variable )
                    			variable = this.getResponseValue ( $(child).attr("identifier") );
                    			break;
                    		case "baseValue":
                    			baseValue = $(child).text();
                    		default: 
                    			exp = this.getExpression ( child.nodeName);
                    	}
                                     	
                    	this.htmlTree (child);
                    } 
                    child = child.nextSibling;
                }
            }
        }
                     
        //             child.getAttribute("identifier");
        //      //        // check if nodeName exists in the config at main.js file. 
        //      //        if ( requirejs.s.contexts._.config.paths[child.nodeName.toLowerCase()] !== undefined ) {
        //      //          loadScriptsArr.push (child.nodeName.toLowerCase());
        //      //    }
        //      //    else {
        //      //      // remove or to do a better way of logs.
        //      //      console.log ("if ", child.nodeName.toLowerCase()," is a directive, please make sure it has been added to main.js");
        //      //    }

        //      //    if (child.className !== undefined && child.className !== "" ) {
        //      //      var classArray = child.className.split(" ");
        //      //      for ( var i=0; i<classArray.length; i++ ) {
        //      //        // check if class exists in the config at main.js file. 
        //      //        if ( requirejs.s.contexts._.config.paths[classArray[i].toLowerCase()] !== undefined ) {
        //      //          loadScriptsArr.push (classArray[i].toLowerCase());
        //      //        }
        //      //        else { 
        //      //          // remove or to do a better way of logs.
        //      //          console.log ("if ", classArray[i].toLowerCase()," is a directive, please make sure it has been added to main.js");
        //      //        }
        //      //      }
        //      //    }
                    
        //              this.htmlTree (child);
        //            }
        //            child = child.nextSibling;
        //         }
        //    }
        //    //return loadScriptsArr;
        // }


  	return Expressions;
});