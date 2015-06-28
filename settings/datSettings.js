"use strict";

// Create an anonymous namespace.
(function(){  

  var settings = {};

  //settings.customerNumber = "1000000";
  //settings.customerLogin = "your login";
  //settings.customerSignature = "your signature";
  //settings.customerPassword = "your password";
  
  //settings.interfacePartnerNumber = "1000000";
  //settings.interfacePartnerSignature = "your interface partner number";
   
  var helper = de.dat.external.utils;
  
  
  // STOP -- Do not edit the code below...
  if (settings.customerNumber)
    helper.setStringProperty("datCustomer", settings.customerNumber);
	 
  if (settings.customerLogin)
    helper.setStringProperty("datUsername", settings.customerLogin);
	
  if (settings.customerPassword)
    helper.setStringProperty("datPassword", settings.customerPassword);	
  
  if (settings.customerSignature)
    helper.setStringProperty("datSignature", settings.customerSignature); 
   
  if (settings.interfacePartnerNumber)
    helper.setStringProperty("datPartnerCustomer", settings.interfacePartnerNumber); 
	
  if (settings.interfacePartnerSignature)  
    helper.setStringProperty("datPartnerSignature", settings.interfacePartnerSignature); 

  // Show DAT Internal Developments Servers. 
  //helper.show("datHostDeveloper");
  
  try {
  
    // an ugly hack. IE's External is a very strange html object. It is always non null but we can
    // not enumerate the properties. So we rely upon a dirty hack. In case the external object is linked
    // with ScriptingObject there has to be a toString method otherwise an exception will be thrown. 
    if ((navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf('Trident/') !== -1))
      if (window.external.toString())
        helper.setBooleanProperty("datDotNetCallback", true);
  }catch (e) {  
  }
  
}());  