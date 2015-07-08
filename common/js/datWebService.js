"use strict";

// Create the namespace
var de = de || {};
  
if (!de.dat)
  de.dat = {};
 
if (!de.dat.external)
  de.dat.external = {};
  
if (!de.dat.external.webservice)
  de.dat.external.webservice = {};  
 
(function(){

  function WebServiceClient() {
  }
  
  WebServiceClient.prototype.createRequest = function() {
	  if(window.XMLHttpRequest)
	    return new XMLHttpRequest();
	  
	  if(window.ActiveXObject){
	    try{
		  return new ActiveXObject("Msxml.XMLHTTP");
	    }catch(err){}
	  
	    try{
		  return new ActiveXObject("Microsoft.XMLHTTP");
	    }catch(err){}
	  }
	
      throw new Error("Can not create the object XMLHttpRequest for the browser");
  };
	
  WebServiceClient.prototype.sendSoap = function(url, message, callback, headers) {
	
    var request = this.createRequest();
	
	var that = this;
	request.onreadystatechange = function()
	{
	  if ( request.readyState != 4 )
	    return;
	  
      if ( request.status == 200 || request.status == 304 ) {
	    callback(request.responseText)
		return;
      }
		
      alert( 'XML request error: ' + request.statusText + ' (' + request.status + ')' ) ;		
	  callback(request.responseText)
	}
	
	request.open('POST', url, true);
    //request.setRequestHeader('Content-Type', 'application/xml');
	  
	request.setRequestHeader ("Content-Type", "text/xml;charset=UTF-8");
	
	for (var i = 0; i < headers.length; i++)
	  request.setRequestHeader (headers[i].name, headers[i].value);
 
	request.send(message);	
  }
 
  // Export the object into the public namespace.
  de.dat.external.webservice =  new WebServiceClient();
}());







