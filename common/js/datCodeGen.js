// Used to generate savascript and html stubs, in order to simplify the integration.    

"use strict";

// Create the namespace...
var de = de || {};
  
if (!de.dat)
  de.dat = {};
 
if (!de.dat.external)
  de.dat.external = {};

if (!de.dat.external.codegen)
  de.dat.external.codegen = {};
  

if (!de.dat.external.demo)  
  throw "Requires de.dat.external.demo";

// ... then add it to the object.
(function(){

  function DatCodeGen() {
  }
  
  //DatCodeGen.prototype.helper = de.dat.external.util;
  DatCodeGen.prototype.demo = de.dat.external.demo;
    
  DatCodeGen.prototype.getScript = function(url) {

    
    var request = de.dat.external.webservice.createRequest() ;
    
    var that = this;
    request.onreadystatechange = function()
    {
      if ( request.readyState != 4 )
        return;
      
      if ( request.status == 200 || request.status == 304 ) {
        that.generateScript( request.responseText );
        return;
      }
        
      alert( 'XML request error: ' + request.statusText + ' (' + request.status + ')' ) ;        
    }
	
    request.open('GET', url, true);
    request.send(null);
  };
    
  DatCodeGen.prototype.replaceStringProperty = function(script, id, optional) {
    
    var value = this.getUtils().getStringProperty(id);
    
    if (value)
      return script.replace('this.helper.getStringProperty("'+id+'")', "'"+value+"'");
      
    if (!optional)
      return script.replace('this.helper.getStringProperty("'+id+'")', 'null');
        
    // if optional drop the whole line...
    var re = new RegExp('^.*this\\.helper\\.getStringProperty\\("'+id+'"\\).*$', "gmi")    
    return script.replace(re, "");
  },
  
  DatCodeGen.prototype.replaceStringPropertyByName = function(script, id) {
    var value = this.getUtils().getStringPropertyByName(id);
    
    if (value)
      return script.replace('this.helper.getStringPropertyByName("'+id+'")', "'"+value+"'");     
        
    // if optional drop the whole line...
    var re = new RegExp('^.*this\\.helper\\.getStringProperty\\("'+id+'"\\).*$', "gmi")    
    return script.replace(re, "");
  },

  DatCodeGen.prototype.replaceBooleanProperty = function(script, id) {
    
    var value = this.getUtils().getBooleanProperty(id);
    
    return script.replace('this.helper.getBooleanProperty("'+id+'")', value);      
  },  
    
  DatCodeGen.prototype.generateScript = function(script) {
  
    var utils = this.getUtils();
    
    var re = new RegExp('"use strict"[^|$]*\\(function\\(\\)\\{');
    script = script.replace(re ,'"use strict";\n\n(function(){');
    
    // Get rid of the helper object.
    var re = new RegExp('^.*helper.*:.*\.helper.*$', "gmi")    
    script = script.replace(re , "");
        
    var namespace = utils.getStringProperty('datGenNamespace');
    var clazz = utils.getStringProperty('datGenClazz');
    
    // Fix the namespace and classname...
    script = script.replace(/^.*de.*\.demo.*=.*\(/gmi,""+namespace+" = new "+clazz+"(");    
    script = script.replace(/Demo\.prototype = \{/,""+clazz+".prototype = {");
    script = script.replace(/function.*Demo\(\)/gmi,"function "+clazz+"()");
      
    script = this.replaceStringPropertyByName(script, "datProduct");
    
    script = this.replaceStringProperty(script, "datHost");
    script = this.replaceStringProperty(script, "datInitialPage");
 
    script = this.replaceStringProperty(script, "datFirstPage", true);
    script = this.replaceStringProperty(script, "datLastPage", true );
      
    script = this.replaceStringProperty(script, "datStyle", true);
      
    script = this.replaceStringProperty(script, "datContainerId");
    script = this.replaceStringProperty(script, "datContainerStyle");
    
    script = this.replaceStringProperty(script, "datCustomer");
    script = this.replaceStringProperty(script, "datUsername");
    script = this.replaceStringProperty(script, "datPassword");
      
    script = script.replace('this.helper.getIntProperty("datContractId")', ''+utils.getIntProperty("datContractId"));            
    script = this.replaceBooleanProperty(script, "datDisplayHeader");
    script = this.replaceBooleanProperty(script, "datReadyHandler");
    script = this.replaceStringProperty(script, "datReadyHandlerUrl", true);
    
    var elm = document.getElementById("datCodeGen");
    if (elm) {
      utils.show('datCodeGen');
      elm.value = script;
    }
    else
      alert(script);
  };
    
  DatCodeGen.prototype.generate = function() {
    this.getScript("../common/js/datDemo.js");    
  };
  
  DatCodeGen.prototype.getUtils = function() {
    if (!de || !de.dat || !de.dat.external || !de.dat.external.utils)
	  throw "Required de.dat.external.utils not included";
	  
    return de.dat.external.utils;
  };
  
  de.dat.external.codegen = new DatCodeGen();  
}());