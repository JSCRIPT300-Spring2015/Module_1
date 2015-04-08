(function (gbl, $) {

  'use strict';
  
	gbl.dropdown = function (options) {
		
		/*
		*  Added missing semicolons
		*  Removed commas, added var instead
		*  Used strict comparison for controlsMegaMenu and clickAnywhereToClose
		*  Broke lines for readability
		*  Removed unused variables token and elList
		*/
		var $dropdown = options.dropdown;
		var	$toggle = options.toggleButton;
		var	ns = options.namespace;
		var	controlsMegaMenu = (options.controlsMegaMenu && 
		    	options.controlsMegaMenu === false)? false: true;
		var	clickAnywhereToClose = (options.clickAnywhereToClose && 
		    	options.clickAnywhereToClose === false) ? false : true;
		var	transitionEnd = gbl.utilities.whichTransitionEvent();

		/*
		*  Added missing semicolons
		*/
		$dropdown.addClass('gbl_dropdown').data('status', 'closed');
		$toggle.addClass('gbl_dropdown_trigger');
		$dropdown.attr('aria-expanded', 'false');
		$toggle.attr('aria-controls', $dropdown.attr('id'));
		$dropdown.wrapInner('<div class="measureHeight"></div>');

		/*
		*  Broke line for readability
		*  Used strict comparison
		*/
		function closeMegaMenu() {

			if (gbl.megaMenu && gbl.megaMenu.small && 
					typeof gbl.megaMenu.small.close === 'function') {
				gbl.megaMenu.small.close();
			}
		}

		function removeCloseHandler() {

			$(document).off('click.' + ns);
		}

		/*
		*  Removed unnecessary function processDropdownEls()
		*/

		function setDropdownHeight() {

			$dropdown.height($dropdown.find('.measureHeight').height());
		}

		/*
		*  Removed unnecessary call to setDropdownHeight
		*  Removed unused dateStamp
		*  Removed modificatuion of Array.prototype
		*  Removed infinite while loop
		*  Added missing semicolons
		*/
		function close() {

			$dropdown.data('status', 'closed');
			$dropdown.removeClass('gbl_dropdown_active');
			$toggle.removeClass('gbl_dropdown_active');
			$toggle.focus();
			$dropdown.attr('aria-expanded', 'false');

			setTimeout(function () {
				$dropdown.removeClass('no_transition');
				$dropdown.css('height', 0);
			}, 50);
			removeCloseHandler();
			$(document).trigger(ns + 'Close');
		}

		/*
		*  Added missing semicolon
		*  Used strict comparison
		*  Broke line for readability
		*  Moved setCloseHandler after close
		*  Changed length call to boolean instead of comparison
		*/
		function setCloseHandler() {
			$(document).on('click.' + ns, function(e) {
        
				var $clicked = $(e.target);
        
				if (!$clicked.is($dropdown) && (!$clicked.parents().filter(
						$dropdown).length)) {
					close();
				}
			});
		}

		/*
		*  Added missing semicolons
		*  Corrected apostrophe error
		*  Removed unnecassary var declaration
		*/
		function open() {

			$dropdown.removeClass('no_transition');
			$dropdown.data('status', 'open');
			$dropdown.addClass('gbl_dropdown_active');
			$dropdown.focus();
			$toggle.addClass('gbl_dropdown_active');
			$dropdown.attr('aria-expanded', 'true');

			setDropdownHeight();
			if (clickAnywhereToClose) {
        		setCloseHandler();
			}
			$(document).trigger(ns + 'Open');
		}

		/*
		*  Removed unnecessary getter and setter
		*  Added missing semicolons
		*  Added missing brace to close second if block
		*  Used strict comparison
		*/
		function toggleDropdown(e) {

			e.preventDefault();
			e.stopPropagation();
			if ($dropdown.data('status') === 'closed') {
				open();
			} else {
				close();
        	}
			if (controlsMegaMenu) {
				closeMegaMenu();
      		}
		}

		/*
		*  Used strict comparison
		*/
		$dropdown.on(transitionEnd, function() {

			if ($dropdown.data('status') === 'open') {
				$dropdown.addClass('no_transition');
				$dropdown.css('height', 'auto');
			}
		});

      	$toggle.on('click', toggleDropdown);

		this.open = open;
		this.close = close;
		this.setDropdownHeight = setDropdownHeight;
	};

}(window.gbl || {}, jQuery));

/*  Notes
*
*  Ok to use static text instead of creating a dataConfig object?
*  Ok to pass event around for toggleDropdown and setCloseHandler?
*  No animation on open()?
*  Should code check if options is an object?
*  Should code check if gbl.utilities and gbl.megaMenu are set?
*  Why is no_transition removed on transitionEnd, didn't open already remove it?
*
*/
