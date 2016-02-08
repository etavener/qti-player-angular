angular.module("contentplayer").service('ResponseManager', function (Response) {

	this._responses = {};
	this._activityIdentifier = '';

	this._retrieveInstance = function(responseIdentifier, responseData) {
		var identifiers = this._getIdentifiers(responseIdentifier);
		//store the reponses inside the activity identifer and the responseIdentifier
		var activityResponses = this._responses[identifiers.activity];
		if(!activityResponses){
			this._responses[identifiers.activity] = {};
			activityResponses = this._responses[identifiers.activity];
		}

        var response = activityResponses[identifiers.response];
        if (response) {
            response.setData(responseData);
        } else {
            response = new Response(responseData);
            activityResponses[identifiers.response] = response;
        }
        return response;
    }

    this._createResponse = function(responseData){
    	var scope = this;
    	var identifier = responseData.getAttribute('identifier');
        var response = this._get(identifier);
        if (response) {
            response.setData(responseData);
        } else {
            response = scope._retrieveInstance(identifier, responseData);
        }
        return response;
    }

    this._getIdentifiers = function(identifier){
    	var activityIdentifier = _activityIdentifier;
    	var responseIdentifier = identifier;

    	var identifiers = identifier.split('.');
    	if(identifiers.length > 1){
    		activityIdentifier = identifiers[0];
    		responseIdentifier = identifiers[1];
    	}
    	return {
    		activity: activityIdentifier,
    		response: responseIdentifier
    	};
    }

    this._get = function(responseIdentifier) {
    	var identifiers = this._getIdentifiers(responseIdentifier);

    	var activityResponses = this._responses[identifiers.activity];
    	if(activityResponses && activityResponses[identifiers.response])
    		return activityResponses[identifiers.response];
    }

    /* public methods */
    this.setActivityIdentifier = function(activityIdentifier){
    	_activityIdentifier = activityIdentifier;
    }

    this.declareResponses = function(xmlNodes){
    	var scope = this;
    	for(var x = 0; x < xmlNodes.length; x++){
			this._createResponse(xmlNodes[x]);
    	}
    }

    this.getResponse = function(responseIdentifier){
        var response = this._get(responseIdentifier);
        return response;
    }

    this.getResponseValue = function(responseIdentifier){
    	var response = this._get(responseIdentifier);
    	return response.getValue();
    }

    this.setResponseValue = function(responseIdentifier, value){
    	var response = this._get(responseIdentifier);
    	if (response) {
    		response.setValue(value);
    	} else {
    		console.log('Could not save the value of the response as Response does not exist.');
    	}
    	console.log('_responses', this._responses);
    }

    this.validResponses = function(){
    	return true;
    }
	


});



