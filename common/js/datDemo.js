"use strict";

// Create a namespace, you should always to that...
var de = de || {};
  
if (!de.dat)
  de.dat = {};
 
if (!de.dat.external)
  de.dat.external = {};

if (!de.dat.external.demo)
  de.dat.external.demo = {};

// We need the helper object only for our demo, you do not need it later.  
if (!de.dat.external.utils)
  throw "Requires de.dat.external.helper";

// ... it's a good practive to contstruct object within an anonymous object.
// so that we don't pollute the global namespace.

(function(){  
   
  function Demo() {
  }  
  
  Demo.prototype = {
    // Import the helper objects into our namespace
    helper : de.dat.external.utils,
  
    getParameter : function() {
      var values = new Object();
		
      // Contract-Id, die vom SOAP zurückkam
   	  values.az = this.helper.getIntProperty("datContractId");  		  
      values.displayHeader = this.helper.getBooleanProperty("datDisplayHeader");
	  values.defaultReadyHandler = this.helper.getBooleanProperty("datReadyHandler");
	  values.urlReadyHandler = this.helper.getStringProperty("datReadyHandlerUrl");
	  
	  //values.CountryCode = "ro_RO";
	  values.locale = {};
	  values.locale.country = this.helper.getStringProperty("datLocaleCounty");
	  values.locale.language = this.helper.getStringProperty("datLocalLanguage");
	  values.locale.datCountryIndicator = this.helper.getStringProperty("datCountryIndicator");
	  //values.DatECode =".."
	  
	  values.version = 2;
        
      return values;
    },
	  
    getLogin : function() {
      var customer = this.helper.getStringProperty("datCustomer");
	  var username = this.helper.getStringProperty("datUsername");
	  var password = this.helper.getStringProperty("datPassword");
	  var signature = this.helper.getStringProperty("datSignature");
		
	  if (password)	  
	    return new DatLoginInformation(customer, username, password);
	    		
	  return new DatSignatureInformation(signature, customer, username);
    },	  
	  	  
	remove : function() {
      //sphinx.invalidate();
    
	  if (!document.getElementById( sphinx.iFrameId ))
	    return;

	  sphinx.deleteIframe();
	},
	  
    add : function () {
	  this.remove();
	   
      // Hier wird die calculatePro-Oberfläche geladen...
      var params = sphinx.getDAFXml(this.getParameter());	  
      var loginInfo = sphinx.encryptPassword(this.getLogin());

      sphinx.host = this.helper.getStringProperty("datHost");	 
	  
	  var initialPage = this.helper.getStringProperty("datInitialPage").split(";");	
	  
	  initialPage[0] = initialPage[0].replace("/vehicleRepairOnline/", "/"+this.helper.getStringPropertyByName("datProduct")+"/");
	  initialPage[0].charAt(1).toUpperCase() + initialPage[0].slice(2);

	  
	  sphinx.firstPage = this.helper.getStringProperty("datFirstPage");
	  sphinx.lastPage = this.helper.getStringProperty("datLastPage");	  
	  
	  var style = this.helper.getStringProperty("datStyle");
	  
	  var container = this.helper.getStringProperty("datContainerId");
	  var model = this.helper.getStringProperty("datContainerStyle");
	  
	  var that = this;
	  sphinx.onError = function(msg) { that.onError(msg) };
	  sphinx.onSuccess = function(object, xml) { that.onSuccess(object, xml) };
		
	  sphinx.init(sphinx.host + initialPage[0], initialPage[1], container, model, style);
      sphinx.execute(loginInfo, params);
	  
    },
	  	  
	onError : function(msg) {
	  alert("Error Reported \n"+msg)
	},
	  
	onSuccess : function(object, xml) {
	  alert("Input completed "+window.location.hash);		
	}
  };	
  
  de.dat.external.demo = new Demo();  
}());
