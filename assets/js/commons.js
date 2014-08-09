var PRJ = PRJ || {};

;
(function() {
	'use strict';

	var method,
			noop = function() {
			},
			methods = [
				'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				'timeStamp', 'trace', 'warn'];

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
	window.l = function(args) {
		console.log(args);
	}



	/*
	 * Analytics
	 * No html deve ter data-ga="Categoria|evento|rotulo"
	 *
	 */

	$('[data-ga]').click(function(event) {
		var data = $(this).data('ga').split('|');
		if (data[3] && data[3] === "waitredirect") {
			event.preventDefault();
			PRJ.trackGARedirect($(this), data[0], data[1], data[2]);
		} else {
			PRJ.trackAnalytics(data[0], data[1], data[2]);
		}
	});

	PRJ.trackAnalytics = function(cat, action, label) {
		if (typeof (_gaq) !== 'undefined') {
			_gaq.push(['_trackEvent', cat, action, label]);
		} else {
			if (typeof (ga) !== 'undefined') {
				ga('send', 'event', cat, action, label);
			}
		}
	};

	PRJ.trackGARedirect = function(button, event, action, label) {

		// track
		trackAnalytics(event, action, label);

		// redirect
		if (button.attr('target') !== '_blank') {
			setTimeout(function() {
				window.self.location = button.attr('href');
			}, 500);
		}
	};

	/**
	 * Ajax
	 * */

	PRJ.ajax = function(postData, done) {
		var ajax = $.ajax({
			type: "POST",
			url: "ajax.php",
			data: postData
		});

		ajax.done(done);
		return ajax;
	};

	PRJ.parseJson = function(r) {
		if (typeof (r) == 'string') {
			r = $.parseJSON(r);
		}
		return r;
	};

	/**
	 * Placeholder Cross Browser
	 * */
	if (!Modernizr.input.placeholder) {
		$('[placeholder]').focus(function() {
			var $input = $(this);
			if ($input.val() == $input.attr('placeholder')) {
				$input.val('');
				$input.removeClass('placeholder');
			}
		}).blur(function() {
			var $input = $(this);
			if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
				$input.addClass('placeholder');
				$input.val($input.attr('placeholder'));
			}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var $input = $(this);
				if ($input.val() == $input.attr('placeholder')) {
					$input.val('');
				}
			})
		});
	}

}());




