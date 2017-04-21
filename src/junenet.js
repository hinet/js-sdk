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
	global.addEventListener("message",function(event){
			var data = event.data;
			global.callback(data.code,data.message);
	}, false);

	function JuneJsSDK() {
		var _self = this;
		/**
         * trim space beside text
         * @param  {String} untrimed string
         * @return {String} trimed string
         */
        this.trim = function(text) {
            return text === null ? "" : text.replace(/^\s+|\s+$/g, '');
        };
        this.pay = function (data,callback) {

            if(!data.open_id || !data.access_token || !data.order_id || !data.title || !data.total_fee || !data.sign){
                return '9';//支付参数错误
            }
            global.callback = callback;
            window.parent.postMessage(data, "*");
            
        }
		
	}
	
	var June = new JuneJsSDK();

	global.June = June;
	global.JuneJsSDK = JuneJsSDK;
})( window );