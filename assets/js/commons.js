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

}());




