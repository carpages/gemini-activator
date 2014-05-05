define(['jquery-loader', 'underscore'], function($, _){

	$.activator = function(element, options){

		// plugin's default options
        var defaults = {
			target: 'this',
			activeClass: 'is-active',
			checkbox: false,
			once: false,
			event: 'click',
			preventDefault: true
        };

        // to avoid confusions, use "base" to reference the current instance of the object
		var base = this;

		// plugin's properties will be available through:
        // base.settings.propertyName from inside the plugin or
        // element.data('activator').settings.propertyName from outside the plugin
		base.settings = $.extend({}, defaults, options);

		// cache / reference to the jQuery version of DOM elements
		var $element = $(element);

		// private methods
        // -------------------------------------------
        // -------------------------------------------

		// extract the targets and their active state from the settings
		var getTargets = function() {

			var targets = [];
			var addTarget = function(target, activeClass){
				targets.push(
					{
						$el: target == "this" ? $element : $(target),
						activeClass: activeClass
					}
				);
			};

			if (_.isArray(base.settings.target)) {

				_.each(base.settings.target, function(target){

					addTarget(target, base.settings.activeClass);

				});

			} else if (_.isObject(base.settings.target)) {

				_.each(base.settings.target, function(activeClass, target){

					addTarget(target, activeClass);

				});

			} else {

				addTarget(base.settings.target, base.settings.activeClass);

			}

			return targets;
		};

		//cache the targets
		var targets = getTargets();

		// the method that initiates DOM listeners and manipulation
		var init = function(){

			// bind the event to toggle the class
			$element.bind(base.settings.event, function(e){
				if(base.settings.preventDefault) e.preventDefault();

				// toggle the class on each target element
				_.each(targets, function(target){
					target.$el.toggleClass(target.activeClass);

					// tick checkbox
					if (base.settings.checkbox){
						target.$el.find(':checkbox').prop('checked',
							target.$el.hasClass(target.activeClass)
						);
					}
				});
				// unbind
				if(base.settings.once) $element.unbind(base.settings.event);
			});

		};

		// fire up the plugin!
		init();

	};

	// add the plugin to the jQuery.fn object
    $.fn.activator = function(method) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined === $(this).data('activator')) {

                // create a new instance of the plugin
                // pass the user-provided "method" (assumed to be an object of options)
                var plugin = new $.activator(this, method);

                // store a reference to the plugin object in case user needs access to public variables and methods
                $(this).data('activator', plugin);

            // if the plugin is already initiated, check to see if the method exists
            } else if ($(this).data('activator')[method]) {
				// call the method
				$(this).data('activator')[method].apply( this, arguments );
            }

        });

    };

    // Return the jquery object
    // This way you don't need to require both jquery and the plugin
    return $;

});
