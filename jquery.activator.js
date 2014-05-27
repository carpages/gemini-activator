/**
 * @fileoverview

A jQuery plugin that activates different elements on the page by binding events
to add and remove the ``is-active`` class.

 *
 * @namespace jquery.activator
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires jquery
 * @requires underscore
 * @requires jquery.boiler
 *
 * @prop {string||array||object} target {@link jquery.activator#target}
 * @prop {string} activeClass {@link jquery.activator#activeClass}
 * @prop {boolean} checkbox {@link jquery.activator#checkbox}
 * @prop {boolean} once {@link jquery.activator#once}
 * @prop {string} event {@link jquery.activator#event}
 * @prop {boolean} preventDefault {@link jquery.activator#preventDefault}
 *
 * @example
  <html>
    <button id="js-activate">Clicking me will add the class 'is-active'</button>
  </html>
 *
 * @example
  $('#js-activate').activator();
 *
 * @example
  <html>
    <button id="js-activate">Clicking me will activate the thingy</button>
    <div id="js-thingy">I am the thingy</div>
  </html>
 *
 * @example
  $('#js-activate').activator({
    target: '#js-thingy'
  });
 */
define(['jquery-loader', 'underscore', 'jquery.boiler'], function($, _){

  $.boiler('activator', {
    defaults: {
      /**
       * Define which element(s) you want to target on activation.
       *
       * This options accepts a single selector string, an array of multiple
       * selector string, or an object of selector strings pointing to the
       * class the will be toggled.
       *
       * @example
        $('#js-activate').activator({
          target: ['#js-thingy-1', '#js-thingy-2']
        });
       *
       * @example
        $('#js-activate').activator({
          target: {
            '#js-thingy-1': 'is-active',
            '#js-thingy-2': 'is-focused'
          }
        });
       *
       * @name jquery.activator#target
       * @type string||array||object
       * @default 'this'
       */
      target: 'this',
      /**
       * The class to toggle on the target.
       *
       * (This is ignored if target is an object)
       *
       * @name jquery.activator#activeClass
       * @type string
       * @default 'is-active'
       */
      activeClass: 'is-active',
      /**
       * Whether to support a checkbox within the target that's synced with
       * the active state
       *
       * @example
        <html>
          <button id="js-activate">Click me :)</button>
          <div id="js-target">
            Dat checkbox
            <input type="checkbox" />
          </div>
        </html>
       *
       * @example
        $('#js-activate').activator({
          target: '#js-target',
          checkbox: true
        });
       *
       * @name jquery.activator#checkbox
       * @type boolean
       * @default false
       */
      checkbox: false,
      /**
       * Whether to only bind the event for one instance. After the first time
       * the target is toggled, it won't be toggled again.
       *
       * @name jquery.activator#once
       * @type boolean
       * @default false
       */
      once: false,
      /**
       * The event that's bound to the element
       *
       * @name jquery.activator#event
       * @type string
       * @default click
       */
      event: 'click',
      /**
       * Whether to preventDefault on the event (helpful for anchors).
       *
       * @name jquery.activator#preventDefault
       * @type boolean
       * @default true
       */
      preventDefault: true,
      /**
       * Callback function when the active state changes
       *
       * @name jquery.activator#onChange
       * @type function
       * @default false
       */
      onChange: false
    },

    init: function(){
      var plugin = this;

      //cache the targets
      plugin.targets = plugin._getTargets();

      // bind the event to toggle the class
      plugin.$el.bind(plugin.settings.event, function(e){
        if(plugin.settings.preventDefault) e.preventDefault();

        plugin.toggle();

        // unbind
        if(plugin.settings.once) plugin.$el.unbind(plugin.settings.event);
      });

    },

    /**
     * Toggles the target(s) activation classes
     *
     * @method
     * @name jquery.activator#toggle
    **/
    toggle: function(){
      var plugin = this;

      // toggle the class on each target element
      _.each(plugin.targets, function(target){
        target.$el.toggleClass(target.activeClass);

        // tick checkbox
        if (plugin.settings.checkbox){
          target.$el.find(':checkbox').prop('checked',
            target.$el.hasClass(target.activeClass)
          );
        }
      });

      if(plugin.settings.onChange) plugin.settings.onChange.call(this);
    },

    /**
     * Gets an object of targets based on the set ``targets`` value
     *
     * Return looks like
      ```
        [{
          $el: $target, //jQuery object to target
          activeClass: 'is-active' //The class to toggle
        }]
      ```
     *
     * @private
     * @method
     * @name jquery.activator#_getTargets
     * @return {array} Array of objects for each target
    **/
    _getTargets: function() {
      var plugin = this;

      var targets = [];
      var addTarget = function(target, activeClass){
        targets.push(
          {
            $el: target == 'this' ? plugin.$el : $(target),
            activeClass: activeClass
          }
        );
      };

      if (_.isArray(plugin.settings.target)) {

        _.each(plugin.settings.target, function(target){

          addTarget(target, plugin.settings.activeClass);

        });

      } else if (_.isObject(plugin.settings.target)) {

        _.each(plugin.settings.target, function(activeClass, target){

          addTarget(target, activeClass);

        });

      } else {

        addTarget(plugin.settings.target, plugin.settings.activeClass);

      }

      return targets;
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

});
