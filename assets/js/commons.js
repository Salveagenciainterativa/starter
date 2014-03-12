;
(function() {
	window.console = window.console || {};

	window.l = function(p) {
		if (typeof (console) == 'object') {
			console.log(p);
		}
	};

}());




