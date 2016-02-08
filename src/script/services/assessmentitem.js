angular.module("contentplayer")
  .service('assessmentitem', function ($http, $q, ResponseManager) {

  	var xmlData
  	var assessmentitem = this;
    

  	//load xml file
  	assessmentitem.loadXML = function(path){

  		var deferred = $q.defer();

      //$timeout(function() {
    		$http.get(path).success(function(data){
          //store the XML
          xmlData = jQuery.parseXML(data);

          //return the itembody xml....
          deferred.resolve(xmlData);

        }).error(function(error){
          throw 'The AssementItem xml file could not be loaded message: "'+error.message+'"';
        });
      //});

      return deferred.promise;

  	}


    /* returns parts of the xml file */
  	assessmentitem.assessmentItemXML = function(){
  		return xmlData;
  	}

  	this.itemBodyXML = function(){
      var itemBody = xmlData.getElementsByTagName("itemBody");
      return itemBody;
  	}

  	assessmentitem.responseDeclarationsXML = function(){
      var responseDeclarations = xmlData.getElementsByTagName("responseDeclaration");
      return responseDeclarations;
  	}

  	assessmentitem.outcomeDeclarationsXML = function(){
      var outcomeDeclarations = xmlData.getElementsByTagName("outcomeDeclaration");
      return outcomeDeclarations;
  	}

  	assessmentitem.responseProcessingXML = function(){
      var responseProcessing = xmlData.getElementsByTagName("responseProcessing");
      return responseProcessing;
  	}

    assessmentitem.modalFeedbackXML = function(){
      var modalFeedback = xmlData.getElementsByTagName("modalFeedback");
      return modalFeedback;
    }

    assessmentitem.title = function(){
      var assessmentTitle = xmlData.getAttribute("title");
      return assessmentTitle;
    }

    assessmentitem.adaptive = function(){
      var adaptive = xmlData.getAttribute("adaptive");
      return adaptive;
    }

    assessmentitem.identifier = function(){
      var identifier = xmlData.getAttribute("identifier");
      return identifier;
    }

    assessmentitem.timeDependent = function(){
      var timeDependent = xmlData.getAttribute("timeDependent");
      return timeDependent;
    }

    assessmentitem.label = function(){
      var label = xmlData.getAttribute("label");
      return label;
    }

    assessmentitem.lang = function(){
      var lang = xmlData.getAttribute("lang");
      return lang;
    }

  	return assessmentitem;

});