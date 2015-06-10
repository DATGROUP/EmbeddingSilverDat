"use strict";

// Create the namespace
var de = de || {};
  
if (!de.dat)
  de.dat = {};
 
if (!de.dat.signature)
  de.dat.signature = {};
  
if (!de.dat.signature.app)
  de.dat.signature.app = {};  
 
(function(){
  
  var timeout = null;   
  
  function SignatureApp() {
  }

  SignatureApp.prototype = {
        
    updateTimeStamp : function() {
        // (a / b | 0) performs an integer division in javascript
		this.getUtils().setStringProperty("datTimeframe", ((new Date().getTime()) / (10*60*1000) | 0));
        this.updateHashes(true);
    },
  
    updateHashes : function(force) {
	
	  var utils = this.getUtils();
	  var self = this;
    
      if (!force) {
        if (timeout != null)
          clearTimeout(timeout);
            
        setTimeout(function() { self.updateHashes(true); }, 500);
      }
        
      if (timeout != null)
        clearTimeout(timeout);
      
      var customer = utils.getStringProperty("datCustomer");
      var login = utils.getStringProperty("datUsername");
      var password = utils.getStringProperty("datPassword");
      
      var token = ""+customer+":"+login+":"+password;
      
      var md5 = new Hashes.MD5();
      var sha256 = new Hashes.SHA256();
      
      document.getElementById("datSha256Key").innerHTML  = "<b>"+sha256.hex(token).toUpperCase()+"</b>";
      document.getElementById("datMd5Key").innerHTML  = "<b>"+md5.hex(token).toUpperCase()+"</b>";
        
      var timeframe = utils.getStringProperty("datTimeframe");              
      token += ":"+timeframe;
	  
      document.getElementById("datSha256TimedKey").innerHTML  = "<b>"+sha256.hex(token).toUpperCase()+"</b>";
      document.getElementById("datMd5TimedKey").innerHTML  = "<b>"+md5.hex(token).toUpperCase()+"</b>";
    },
      
    getUtils : function() {
      if (!de || !de.dat || !de.dat.external || !de.dat.external.utils)
        throw "Required de.dat.external.utils not included";
        
      return de.dat.external.utils;
    },  
  }
     
  // Export the object into the public namespace.
  de.dat.signature.app = new SignatureApp();  
  de.dat.external.utils.addEvent(window, 'load', function() { de.dat.signature.app.updateTimeStamp(); } );
  
}());
