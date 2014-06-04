var PRJ = PRJ || {};

;(function() {
	'use strict';
	
	var method,
		noop = function () {},
		methods = [
	   'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	   'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	   'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	   'timeStamp', 'trace', 'warn' ];
	
	var length = methods.length,
		console = (window.console = window.console || {});

	while (length--) {
	   method = methods[length];

	   // Only stub undefined methods.
	   if (!console[method]) {
	       console[method] = noop;
	   }
	}
	
	//console.log shortcut
	window.l =  function(args) {
		console.log(args);
	}



/*
 * Analytics
 * No html deve ter data-ga="Categoria|evento|rotulo"
 *
 */

	$('[data-ga]').click(function (event) {
		var data = $(this).data('ga').split('|');
		if(data[3] && data[3] === "true") {
			event.preventDefault();
			PRJ.trackGARedirect($(this), data[0], data[1], data[2]);
		} else {
			PRJ.trackAnalytics(data[0], data[1], data[2]);
		}
	});

	PRJ.trackAnalytics = function (event, action, label) {
	    if (typeof (_gaq) !== 'undefined') {
	        _gaq.push(['_trackEvent', event, action, label]);
	    }
	};

	PRJ.trackGARedirect = function (button, event, action, label) {
		
	    // track
	    trackAnalytics(event, action, label);

	    // redirect
	    if(button.attr('target') !== '_blank') {
	    	setTimeout(function () {
	    	    window.self.location = button.attr('href');
	    	}, 500);
	    }
	};


}());




