angular.module("contentplayer")
  .service('assessmentTestData', ['$http', '$q', 'ResponseManager', 'Expressions', function ( http, q, ResponseManager, Expressions ) {
        var testPart; // saves the test part XML
        var currentAssessmentItemRef; // save the current Item reference
        var xmlPathToAssessmentItemRef = []; // Save an array of identifiers from item reference to the top
        var _activityIdentifier = ""; // Save the current activity item identifier

        this.loadAssessmenetData = function ( path, parameterId ) {
          var deferred = q.defer();
          var service = this;

          http.get(path).success(function(data){
            //store the XML
              testPart = jQuery.parseXML(data).getElementsByTagName("testPart");

              //return the itembody xml....
              deferred.resolve( service.getAssessmentItemRefByParameterId ( parameterId ) );

            }).error(function(error){
              throw 'The AssementItem xml file could not be loaded message: "'+error.message+'"';
            });

          return deferred.promise;
        };

        this.getAssessmentItemRefByParameterId = function ( parameterId ) {
          if ( parameterId !== "" )
            currentAssessmentItemRef =  $(testPart).find("assessmentItemRef[identifier=" + parameterId + "]");
          else {
            //convert to a jquery obj.
            currentAssessmentItemRef =  $($(testPart).find("assessmentItemRef")[0]);
          }

          this._setPathToAssessmentItemRef();

          return this.getCurrentAssessmentItemLink();
          //this.checkPreConditions ( assessmentItemRef );
        };

        this.checkPreConditions = function () {
          // TODO: Adding preConditions Rules
        };

        this.checkBranching = function () {

          var service = this;

          if ( currentAssessmentItemRef.children("branchrule").length > 0 ) {
            var brunchRuleObj = [];
            currentAssessmentItemRef.children("branchrule").each(function () {
              Expressions.getParams ( this );
               // var target = $(this).attr("target") // get the target Id 
               // var expression = $()
               // var variable = $(this).find("variable")[0] // get the varibable needs to be checked against.
               // var answer = ResponseManager.getResponseValue( $(variable).attr("identifier") );
               // if ( answer !== "none" ) {
               //    var baseValue = $(this).find("baseValue")[0]; // Check the value that the respnse needs to be checked against
               //    if ( $(baseValue).text() === answer ) {
               //      service.getAssessmentItemRefByParameterId ( target );
               //      return false;
               //    }
               // }
            });
          }
          else
            return false;
        };

        this.getNextAssessmentItemRef = function ( direction ) {
          if ( direction == "Next" || direction == "" || direction === undefined ) {
            if ( !this.checkBranching() ) {
              if ( currentAssessmentItemRef.next("assessmentItemRef").length > 0 ) {
                currentAssessmentItemRef = currentAssessmentItemRef.next("assessmentItemRef");
                this._setPathToAssessmentItemRef();
                return this.getCurrentAssessmentItemLink();
              }
              else {
                return this.findNextItemRef( direction );
              }
            }
          }
          else {
            if ( currentAssessmentItemRef.prev("assessmentItemRef").length > 0 ) {
              currentAssessmentItemRef = currentAssessmentItemRef.prev("assessmentItemRef");
              this._setPathToAssessmentItemRef();
              return this.getCurrentAssessmentItemLink();
            }
            else {
              return this.findNextItemRef( direction );
            }
          }  
        };

        this.findNextItemRef = function ( direction ) {
          // remove the first element from the array in order to know what is the parent element. 
          xmlPathToAssessmentItemRef.shift()

          if ( xmlPathToAssessmentItemRef.length > 0 ) {
            if ( direction == "Next" || direction == "" || direction === undefined ) {
              // get the next available item
              currentAssessmentItemRef = $($(testPart).find("assessmentSection[identifier=" + xmlPathToAssessmentItemRef[0] + "]").next().children("assessmentItemRef")[0]);
            }
            else {
              // get the previous available item
              currentAssessmentItemRef = $($(testPart).find("assessmentSection[identifier=" + xmlPathToAssessmentItemRef[0] + "]").prev().children("assessmentItemRef")[0]);
            }
             
            if ( $(currentAssessmentItemRef).length > 0 ) {
                this._setPathToAssessmentItemRef ();
                return this.getCurrentAssessmentItemLink();
            }
            else {
              this.findNextItemRef( direction );
            }
          }
          else {
            console.log ("can't find any more assessment items.")
            return false;
          }
        };

        // return the href of the itemRef 
        this.getCurrentAssessmentItemLink = function () {
          console.log ( "href", currentAssessmentItemRef.attr("href") )
          return currentAssessmentItemRef.attr("href");
        };

        this._setPathToAssessmentItemRef = function () {
          xmlPathToAssessmentItemRef = []; // reset the array
          _activityIdentifier = currentAssessmentItemRef.attr("identifier") // set the activityIdentifier as a private
          this.setNodePathToParameterId ( currentAssessmentItemRef );  // start setting the array
        };

        this.setNodePathToParameterId = function ( node ) {
          if ( node.nodeName !== "testPart" ) {
            if ( $(node).attr("identifier") ) {
              xmlPathToAssessmentItemRef.push ($(node).attr("identifier") );
              this.setNodePathToParameterId ( $(node).parent()[0] );
            }
            else 
              console.log ( node.nodeName );
          }
          else 
            if ( $(node).attr("identifier") )
              xmlPathToAssessmentItemRef.push ($(node).attr("identifier") );
            else
              console.log ( "Test part node doesn't have an identifier");
        };

        this.getActivityIdentifier = function () {
          return _activityIdentifier;
        };

        this.getBreadCrumb = function () {
          var titles = [];
          for ( i=xmlPathToAssessmentItemRef.length-2;i>0;i--) {
            var a = $( testPart ).find("[identifier='"+ xmlPathToAssessmentItemRef[i] +"']" )[0];
            titles.push ( $(a).attr("title") );
          }
          return titles;
        };

        // // TODO: Need to be set in more general place
        // this.baseURL = "data/"; // save the base url for the xml data
        // this.nodePathToParameterId = []; // Save the identifiers id
        // // this.branching = []; // Save the branching for each node
        // // this.preConditions = []; // Save the preConditions for each node
        // var titles = []; // Save the title for the breadcrumb
        // var activityId = "";

        // this.getActivityId = function () {
        //   return activityId;
        // }

        // this.getTitles = function () {
        //   return this.titles;
        // }

        

        // this.getAssestmentItemNodeById = function () {
        //   return $( this.xmlData ).find("assessmentItemRef[identifier=" + parameterId + "]");
        // };

        // this.getAssestmentItemFirstNode = function () {     
        //   return $( this.xmlData ).find("assessmentItemRef")[0];
        // };

        // this.setNodePathToParameterId = function ( node ) {
        //   if ( node.nodeName !== "testPart" ) {

        //     if ( $(node).attr("identifier") ) {
        //       this.nodePathToParameterId.splice (0,0,$(node).attr("identifier") );
        //       titles.splice (0,0,$(node).attr("title") );
        //       this.setNodePathToParameterId ( $(node).parent()[0] );
        //     }
        //     else 
        //       console.log ( node.nodeName );
        //   }
        //   else 
        //     if ( $(node).attr("identifier") )
        //       this.nodePathToParameterId.splice (0,0,$(node).attr("identifier") );
        //     else
        //       console.log ( "Test part node doesn't have an identifier");
        // };

        // this.saveBranchingForNode = function ( node ) {
        //   // var brunchRules = $(node).children("branchrule");
        //   // for ( var i=0;i<brunchRules.length;i++ ) {
        //   //   console.log ( $(node).attr("identifier"),brunchRules[i])
        //   // }
        // };

        // this.savePreConditionsForNode = function ( node ) {
        //   // will save branching for each node.
        // };



        // this.htmlTree = function ( obj ) {

        //   console.log ( obj );
        //   return;

        //   if (obj.hasChildNodes()) {
        //     var child = obj.firstChild;
            
        //       while (child) {
        //            if ( child.nodeType === 1 ) {
        //             console.log ( "child", child.getAttribute("identifier") );
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


}]);