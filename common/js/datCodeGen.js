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
  
  DatCodeGen.prototype.generateHtml = function() {
  
    var utils = this.getUtils();
    
    var html = "";
    html += '<!DOCTYPE html>\n';
    html += '<html>\n';
    html += '  <head>\n';
    html += '    <meta http-equiv="X-UA-Compatible" content="IE=edge" >\n';
    html += '\n';
    html += '    <title>Client interface integration test (calculatePro)</title>\n';
    html += '\n';
    html += '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n';
    html += '    <meta http-equiv="cache-control" content="max-age=0"/>\n';
    html += '    <meta http-equiv="cache-control" content="no-cache"/>\n';
    html += '    <meta http-equiv="expires" content="0"/>\n';
    html += '    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT"/>\n';
    html += '    <meta http-equiv="pragma" content="no-cache"/>\n';
    html += '\n';
    html += '    <script type="text/javascript" src="lazyload.js"></script>\n';
    html += '    <script type="text/javascript" src="externalSphinx.js"></script>\n';
    html += '  </head>\n';
    html += '\n';
    html += '  <body>\n';
    html += '    <div>\n';
    html += '      <button onclick="'+utils.getStringProperty('datGenNamespace')+'.add()">Add/Update</button>\n';
    html += '      <button onclick="'+utils.getStringProperty('datGenNamespace')+'.remove()">Remove</button>\n';
    html += '    </div>\n';
    html += '\n';
    html += '    <div id="'+utils.getStringProperty('datContainerId')+'"></div>\n';
    html += '  </body>\n';
    html += '</html>\n';
    
    var elm = document.getElementById("datCodeGen");
    if (elm) {
      utils.show('datCodeGen');
      elm.value = html;
    }
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
    script = this.replaceStringProperty(script, "datSignature");
      
    script = script.replace('this.helper.getIntProperty("datContractId")', ''+utils.getIntProperty("datContractId"));            
    script = this.replaceBooleanProperty(script, "datDisplayHeader");
    script = this.replaceBooleanProperty(script, "datReadyHandler");
    script = this.replaceStringProperty(script, "datReadyHandlerUrl", true);
    
    script  = this.replaceStringProperty(script, "datLocaleCounty" ,true);
    script  = this.replaceStringProperty(script, "datLocalLanguage", true);
    script  = this.replaceStringProperty(script, "datCountryIndicator", true);
    
    // remove all reverences to our helper script...
    script = script.replace(/helper : .*,/gmi,"");
    script = script.replace(/^if\W*\(.*utils\)\W*throw\W*".*";/gmi,"");
    
    // Then cleanup the event handler...
    if (this.getUtils().getBooleanProperty("datDotNetCallback")) {
      script = script.replace(/\/\/ \{not:dotNetCallback:begin\}(.|[\r\n])*?\/\/ \{not:dotNetCallback:end\}/gmi,"");
      script = script.replace(/\/\/ \{dotNetCallback:\w*\}/gmi,"");
      script = script.replace(/^\W*if\W*\(.*getBooleanProperty\(\"datDotNetCallback\"\)\)/gmi,"");
    }
    else {
      script = script.replace(/\/\/ \{not:dotNetCallback:\w*\}/gmi,"");
      script = script.replace(/\/\/ \{dotNetCallback:begin\}(.|[\r\n])*?\/\/ \{dotNetCallback:end\}/gmi,"");
      script = script.replace(/^\s*if\s*\(.*getBooleanProperty\("\w"\)\)/gmi,"");
    }
    
    // Drop all comments...
    script = script.replace(/\/\/  .*$/gmi,"");
    
    var elm = document.getElementById("datCodeGen");
    if (elm) {
      utils.show('datCodeGen');
      elm.value = script;
    }
  };
    
  DatCodeGen.prototype.generate = function() {
    this.getScript("datDemo.js");    
  };
  
  DatCodeGen.prototype.getUtils = function() {
    if (!de || !de.dat || !de.dat.external || !de.dat.external.utils)
	  throw "Required de.dat.external.utils not included";
	  
    return de.dat.external.utils;
  };
  
  de.dat.external.codegen = new DatCodeGen();  
}());