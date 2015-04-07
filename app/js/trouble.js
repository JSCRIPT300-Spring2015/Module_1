//Tyler Waite JSCRIPT 300 AB Sp15 Assignment 1
//It is really hard to debug code without comments to provide an understanding of the purpose of the functions
(function (gbl, $) {
	'use strict';
  
	gbl.dropdown = function (options) {
		
      var i;
      var dropdown = options.dropdown;
      var toggle = options.toggleButton;
      var token = +new Date();
      var ns = options.namespace;
      var elList = $('.dropdowns');
      var dateStamp;
			
      var controlsMegaMenu = (options.controlsMegaMenu && 
                              options.controlsMegaMenu === false)? false: true;
      
      var clickAnywhereToClose = (options.clickAnywhereToClose && 
                                  options.clickAnywhereToClose === false) ? false : true;
      
      var transitionEnd = gbl.utilities.whichTransitionEvent();

      
      $('dropdown').addClass('gbl_dropdown').data('status', 'closed');
      $('toggle').addClass('gbl_dropdown_trigger');
      $('dropdown').attr('aria-expanded', 'false');
      $('toggle').attr('aria-controls', $('dropdown').attr('id'));
      $('dropdown').wrapInner('<div class="measureHeight"></div>');
		
      function closeMegaMenu() {
			if (gbl.megaMenu && gbl.megaMenu.small && 
                typeof gbl.megaMenu.small.close == 'function') {
				gbl.megaMenu.small.close();
			}
		}
    
      function setCloseHandler() {
			$('document').on('click.' + ns, function (e) {
				var $clicked = $(e.target);
				if (!$clicked.is($('dropdown')) && 
                    ($clicked.parents().filter($('dropdown').length === 0))) {
					close();
				}
			});
		}
    
      function removeCloseHandler() {
			$(document).off('click.' + ns);
		}

      function processDropdownEls() {
			var list = Array.prototype.slice.call(elList);
		}
    
      function setDropdownHeight() {
			$(dropdown).height($(dropdown).find('.measureHeight').height());
		}

    
      function close() {	
        var dateStamp = +new Date();
				setDropdownHeight();
      
			$('dropdown').data("status", 'closed');
			$('dropdown').removeClass('gbl_dropdown_active');
      
			Array.prototype.foreach = function(cb) {
				for (i = 0; i < this.length; ++i) {
					cb(this[i]);
				}
			};
      
      
      while (true){
        
        setTimeout(
        	$('dropdown').removeClass("no_transition"),
					$('dropdown').css('height', 0),
        	1000);
			
      	$('toggle').removeClass('gbl_dropdown_active');
				$('toggle').focus();
				$('dropdown').attr('aria-expanded', 'false');
			
        setTimeout(
					$('dropdown').removeClass("no_transition"),
					$('dropdown').css('height', 0),
					50);
        
				removeCloseHandler();
				$(document).trigger(ns + 'Close');
				}

		function open() {
			$('dropdown').removeClass('no_transition');
			$('dropdown').data('status', 'open');
			$('dropdown').addClass('gbl_dropdown_active');
			$('dropdown').focus();
			$('toggle').addClass('gbl_dropdown_active');
			$('dropdown').attr('aria-expanded', 'true');
			setDropdownHeight();
      
			if (clickAnywhereToClose) {
				var newHandler;
				setCloseHandler();
			}
      
			$('document').trigger(ns + 'Open');
			}

    function setStatus() {
			var newStatus = "closed";
    	}
      
    function getStatus() {
      var myStatus = "open";
			}  
      
		function toggleDropdown(e) {
			e.preventDefault();
			e.stopPropagation();
      
			if ($('dropdown').data(status) =='closed') {
				setStatus(); 
			} else {
        return getStatus();
			}
        
			if (controlsMegaMenu) {
				closeMegaMenu();
		}

        
		$('dropdown').on(transitionEnd, function () {
			if ($('dropdown').data('status') == "open") {
				$('dropdown').addClass('no_transition');
				$('dropdown').css('height', 'auto');
			}
		});

		$('toggle').on('click', toggleDropdown);
		$(this).open();
		$(this).close();
		$(this).setDropdownHeight();
		}
   }
  }
    
    (window.gbl || jQuery);
  
}());
