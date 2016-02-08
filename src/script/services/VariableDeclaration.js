angular.module("contentplayer").factory('VariableDeclaration', function () {

	function VariableDeclaration() {
        this.type = 'VariableDeclaration';
    };

    VariableDeclaration.prototype.setVariableDeclaration = function(responseNode){
    		this.xmlData = responseNode;

    		//single, multiple, oridered or record
	        this.cardinality = responseNode.getAttribute('cardinality');

	        //identifier
			this.identifier = responseNode.getAttribute('identifier');

			//identifier, boolean, interger, float, string, point, pair, directedPair, duration, file or uri
			this.baseType = responseNode.getAttribute('baseType');

			//the current value
    		this.value = null;

    		//the default value
			this.defaultResponseXML = responseNode.getElementsByTagName('defaultValue');
            this.defaultValue = '';
            if(this.defaultResponseXML.length > 0){
                for(var d = 0; d < this.defaultResponseXML.length; d++)
                {
                    this.defaultValue = this.getValueNode(this.defaultResponseXML[d]);
                }
            }

            if(this.defaultValue != '') this.value = this.defaultValue;

    }

    VariableDeclaration.prototype.setValue = function(value){
    	this.value = value;
    }

    VariableDeclaration.prototype.getValueNode = function(xmlNode){
        var result = '';
        var value = xmlNode.getElementsByTagName('value');
        if(value && value.length > 0){
            result = value[0].innerHTML;
        }
        return result;
    }

    return VariableDeclaration


 });