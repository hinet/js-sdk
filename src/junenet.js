;(function( global ){
	'use strict';
	/**
	 * Creates new cookie or removes cookie with negative expiration
	 * @param  key       The key or identifier for the store
	 * @param  value     Contents of the store
	 * @param  exp       Expiration - creation defaults to 30 days
	 */
	function createCookie(key, value, exp) {
	    var date = new Date();
	    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
	    var expires = "; expires=" + date.toGMTString();
	    document.cookie = key + "=" + value + expires + "; path=/";
	}

	/**
	 * Returns contents of cookie
	 * @param  key       The key or identifier for the store
	 */
	function readCookie(key) {
	    var nameEQ = key + "=";
	    var ca = document.cookie.split(';');
	    for (var i = 0, max = ca.length; i < max; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ') {
	            c = c.substring(1, c.length);
	        }
	        if (c.indexOf(nameEQ) === 0) {
	            return c.substring(nameEQ.length, c.length);
	        }
	    }
	    return null;
	}

	// if current browser is not support localStorage
	// use cookie to make a polyfill
	if ( !window.localStorage ) {
	    window.localStorage = {
	        setItem: function (key, value) {
	            createCookie(key, value, 30);
	        },
	        getItem: function (key) {
	            return readCookie(key);
	        },
	        removeItem: function (key) {
	            createCookie(key, '', -1);
	        }
	    };
	}

	function JuneJsSDK() {
		var _self = this;
		this.ajax = function(){
			var ajax;
            if (ie && ie <= 9) {
                ajax = new moxie.xhr.XMLHttpRequest();
                moxie.core.utils.Env.swf_url = op.flash_swf_url;
            }else{
                ajax = that.createAjax();
            }
		}
		this.createAjax = function(argument) {
	        var xmlhttp = {};
	        if (window.XMLHttpRequest) {
	            xmlhttp = new XMLHttpRequest();
	        } else {
	            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	        }
	        return xmlhttp;
	    };
	}
	
	var June = new JuneJsSDK();

	global.June = June;
	global.JuneJsSDK = JuneJsSDK;
})( window );