angular.module("contentplayer").factory('Response', function (VariableDeclaration) {

	function Response(responseData) {
        VariableDeclaration.apply(this, arguments);
        if (responseData) {
            this.setData(responseData);
        }
    };

    //extend the VariableDeclaration class
    Response.prototype = Object.create(VariableDeclaration.prototype);
    Response.prototype.constructor = VariableDeclaration;

    Response.prototype.setData = function(responseNode) {
        //pass the data to the VariableDeclaration sub class.
        this.setVariableDeclaration(responseNode);

        //only response declarations can have a correct value.
        this.correctResponseXML = responseNode.getElementsByTagName('correctResponse');
        this.correctValue = '';
        for(var c = 0; c < this.correctResponseXML.length; c++){
            this.correctValue = this.getValueNode(this.correctResponseXML[c]);
        }

        //if no response set it to false.
        this.responded = (this.responded) ? true : false;
    },
    Response.prototype.setValue = function(responseValue){
        //call super method.
        VariableDeclaration.prototype.setValue.apply(this, arguments);
        //
        this.responded = true;
    },
    Response.prototype.getValue = function(){
        return this.value;
    },
    Response.prototype.isValid = function(){
        //is the response valid???
        return true;
    },
    Response.prototype.save = function(){
        //save the reponse to the LMS..??
    }

    return Response;


  });