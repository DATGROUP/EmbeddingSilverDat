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
  
}());  