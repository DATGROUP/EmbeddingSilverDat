"use strict";

// Create the namespace
var de = de || {};
  
if (!de.dat)
  de.dat = {};
 
if (!de.dat.external)
  de.dat.external = {};
  
if (!de.dat.external.helper)
  de.dat.external.helper = {};  
 
(function(){
  
  function PropertyHelper() {
  }

  PropertyHelper.prototype = {
    
    initGlueCodeDialog : function() {
      var utils = this.getUtils();
    
      utils.setStringProperty("datCodeGen","");
      utils.hide("datCodeGen");
    },
    
    openHost : function() {
      var utils = this.getUtils();
      
      var login = utils.getStringProperty("datUsername");
      var signature = utils.getStringProperty("datSignature"); 
      var customer = utils.getStringProperty("datCustomer");    
      
      var url = utils.getStringProperty("datHost")+"/eventList/eventList.html";
      
      if (!login && !signature && !customer)
        alert("Could not authenticate via signature, check your credentials login, customer number and signature.");
      
      url+="?signature="+signature+"&customerNumber="+customer+"&login="+login;
      
      window.open(url,'_blank');
    },
  
    updateHost : function() {
      var utils = this.getUtils();
    
      var protocol = utils.getStringPropertyByName("datProtocol");
      var product = utils.getStringPropertyByName("datProduct");
      var host = utils.getStringPropertyByName("datHost");          
      
      utils.setStringProperty("datHost", ""+protocol+"://"+host+"/"+product);
    },
  
    updateNavigation : function() {
      var utils = this.getUtils();
    
      var scope = utils.getStringPropertyByName("datScope");
      
      utils.hideChildren("datScope",scope);
      utils.show(scope);
      
      var initial = "";
      var first = "";
      var last = ""
      
      if (scope == "datScopeEventList") {
        initial = utils.getStringProperty("datScopeEventListInitialPage");
      }
      else if (scope == "datScopeWizard") {
        initial = utils.getStringProperty("datScopeWizardInitialPage");
      first = utils.getStringProperty("datScopeWizardFirstPage");
      last = utils.getStringProperty("datScopeWizardLastPage");
      }
      else if (scope == "datScopeSettings") {
        initial = utils.getStringPropertyByName("datScopeSettings");    
      }
          
      utils.setStringProperty("datInitialPage",initial);
      utils.setStringProperty("datFirstPage",first);
      utils.setStringProperty("datLastPage",last);
    },
  
    updateSoapUrl : function(service) {
      var utils = this.getUtils();
    
      var div = document.createElement('div');
      var span = document.createElement('span');
      
      span.appendChild(document.createTextNode(""+utils.getStringProperty("datHost")+service));
      div.appendChild(span)
      
      document.getElementById("datSoapUrls").appendChild(div);
    
      div = document.createElement('div');
      
      var a = document.createElement('a');
      a.appendChild(document.createTextNode("View"));
      a.href = ""+utils.getStringProperty("datHost")+service;
      a.target = "_blank";
      
      div.appendChild(a);  
    
      var a = document.createElement('a');
      a.appendChild(document.createTextNode("WSDL"));
      a.href = ""+utils.getStringProperty("datHost")+service+"?wsdl";
      a.target = "_blank";
      div.appendChild(a);  
    
      var a = document.createElement('a');
      a.appendChild(document.createTextNode("Browse"));
      a.href = "http://janschneider.de/wsdl_browser.php?url="+encodeURIComponent(""+utils.getStringProperty("datHost")+service+"?wsdl");
      a.target = "_blank";
      div.appendChild(a);  
      
      document.getElementById("datSoapUrls").appendChild(div);        
    },
    
    updateSoapUrls : function() {
      
      this.getUtils().removeChildren("datSoapUrls");
      
      this.updateSoapUrl("/services/VehicleRepairService");
      this.updateSoapUrl("/services/Authentication");    
    },
  
    sendSoap : function() {  
      var utils = this.getUtils();
    
      var customerLogin = utils.getStringProperty("datUsername");
      var customerSignature = utils.getStringProperty("datSignature"); 
      var customerNumber = utils.getStringProperty("datCustomer");    
      
      if (!customerLogin || !customerSignature || !customerNumber) {
        alert("Customer Credentials invalid");
        return;
      }    
      
      var interfacePartnerNumber = utils.getStringProperty("datPartnerCustomer");        
      var interfacePartnerSignature = utils.getStringProperty("datPartnerSignature");
      
      if (!interfacePartnerNumber)
        interfacePartnerNumber = customerNumber;
                
      if (!interfacePartnerNumber || !interfacePartnerSignature) {
        alert("Partner Credentials invalid");
        return;
      }    
    
      var headers = [ 
          /* { name : "soapAction", value: ""+this.getStringProperty("datSoapAction")},*/
         { name : "customerSignature", value: customerSignature },
         { name : "customerNumber", value: customerNumber },
         { name : "interfacePartnerNumber", value: interfacePartnerNumber },
         { name : "interfacePartnerSignature", value: interfacePartnerSignature},
         { name : "customerLogin", value: customerLogin}];
         
      var request = utils.getStringProperty("datSoapRequest");
      
      var response = function(script) {      
        utils.show("datSoapResponse");
        utils.setStringProperty("datSoapResponse", script);
      }
    
      var url = ""+utils.getStringProperty("datHost")+"/services/VehicleRepairService";
      this.getWebService().sendSoap(url, request, response, headers);    
    },
    
    getUtils : function() {
      if (!de || !de.dat || !de.dat.external || !de.dat.external.utils)
        throw "Required de.dat.external.utils not included";
        
      return de.dat.external.utils;
    },
      
    getWebService: function() {
      return de.dat.external.webservice;
    }
     
  }
 
  // Export the object into the public namespace.
  de.dat.external.helper =  new PropertyHelper();
}());
