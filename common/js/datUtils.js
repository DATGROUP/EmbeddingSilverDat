"use strict";

// Create the namespace
var de = de || {};
  
if (!de.dat)
  de.dat = {};
 
if (!de.dat.external)
  de.dat.external = {};
  
if (!de.dat.external.utils)
  de.dat.external.utils = {};  
 
(function(){
  
  function PropertyUtils() {
  }

  PropertyUtils.prototype = {
  
    getIntProperty: function(id) {
      var elm = document.getElementById(id);		
      var id = parseInt(elm.value, 10);
		
	  if (isNaN(id))
        return null;
		  
	  return id;
    },
	  
    getBooleanProperty: function(id) {
      var elm = document.getElementById(id);
	  return elm.checked;		
    },
	  
    getStringProperty: function(id) {
      var elm = document.getElementById(id);				
	  
	  if (!elm)
	    throw "Element "+id+" not found";
	  
      var str = elm.value;
				
	  if (str == null)
        return null;
		   
      if (str.trim() == "")
        return null;
		   
	  return str;
    },	
	
    setStringProperty: function(id, str) {
      var elm = document.getElementById(id);				
      elm.value = str;				
    },	
	
	getStringPropertyByName: function(name, value) {	
	  var items = document.getElementsByName(name);
	  
      for (var i = 0; i < items.length; i++)
	    if (items[i].checked)
		  return items[i].value;	
		  
	  if (typeof value === 'undefined')
	    return null
		
	  return value;
    },	
		
	toggle: function(element) {
	    var el = document.getElementById(element);
		if (!el)
		  return;
		
        if ( el.style.display == "inline" )
		  hide(el);
		else
		  show(el);
	},

	show: function(elm) {
	
	  if (typeof elm === 'string')
	    elm = document.getElementById(elm);			
		
	  if (!elm)
	    return;
		  
	  elm.style.display = "inline";
	},
	  
	hide: function(elm, target) {
	
	  if (typeof elm === 'string')
	    elm = document.getElementById(elm);	
		
      if (!elm)
	    return;
		  
	  if ((target) && (elm != target)) 		  
	    return;

	  elm.style.display = "none";
	},
	  
	showDialog: function(id, init, tab) {
	  this.show("datDialogs");
	  this.show("overlay");
	  this.show(id);
	  
	  var that = this;
	  
      document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode != 27)
		  return;
		  
		that.hideDialogs();
      };	

      if (typeof init == "function")
        init();	  
		
	  if (tab)
	    this.showTab(tab);
	},
	
	setClass: function (elm, clazz) {
      if (typeof elm === 'string')
	    elm = document.getElementById(elm);	
	  
	  elm.className = clazz;
	},
	
	addClass : function (elm, clazz) {
      if (typeof elm === 'string')
	    elm = document.getElementById(elm);	
	  
	  elm.className += clazz;
	},
	
	removeClass : function(elm, clazz) {
      if (typeof elm === 'string')
	    elm = document.getElementById(elm);	
		
      var re = new RegExp("(?:^|\\s)"+clazz+"(?!\\S)", "g");
	  elm.className = elm.className.replace( re , '' )		
	},
	
	hasClass : function(elm, clazz) {
	  if (typeof elm === 'string')
	    elm = document.getElementById(elm);	
		
      var re = new RegExp("(?:^|\\s)"+clazz+"(?!\\S)");		
	  return elm.className.match(re);
	},
	
	showTab: function(id) {

  	  var elm = document.getElementById(id+"Tab");	
		
	  this.hideChildren(elm.parentNode,id+"Tab");
	  this.show(elm);		 
	  
	  elm = document.getElementById(id+"Header");
	  if (!elm)
	    return;
		
	  var items = elm.parentNode.getElementsByClassName("datTabSelected");
	  
	  for (var i = 0; i < items.length; i++)
	    this.removeClass(items[i],"datTabSelected");
		
	  this.addClass(id+"Header", "datTabSelected");
	},
	
	hideChildren : function(elm, keep) {
	  if (!elm)
	    return;
	
	  if (typeof elm === 'string')
	    elm = document.getElementById(elm);		
	  
	  if (!elm)
	    throw "Could not hide children, no parent element";
	  
	  var c = elm.children;
		
	  for (var i = 0; i < c.length; i++)
	    if (keep != c[i].id)
		  this.hide(c[i]);				  	
	},
	  
	hideDialogs : function() {
	  this.hideChildren("datDialogs");
	  this.hide("datDialogs");	  
	},	
	
    addEvent : function (element, eventName, fn) {
      if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
      else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
    },

	removeChildren : function(elm) {
	  if (!elm)
	    return;
		
	  if (typeof elm === 'string')
	    elm = document.getElementById(elm);	
	
      while (elm.hasChildNodes())
        elm.removeChild(elm.lastChild);	
	}
  }
 
  // Export the object into the public namespace.
  de.dat.external.utils =  new PropertyUtils();
}());
