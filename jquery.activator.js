define(['jquery-loader', 'underscore', 'jquery.boiler'], function($, _){

  $.boiler('activator', {
    defaults: {
      target: 'this',
      activeClass: 'is-active',
      checkbox: false,
      once: false,
      event: 'click',
      preventDefault: true
    },

    init: function(){
      var plugin = this;

      //cache the targets
      plugin.targets = plugin._getTargets();

      // bind the event to toggle the class
      plugin.$el.bind(plugin.settings.event, function(e){
        if(plugin.settings.preventDefault) e.preventDefault();

        // toggle the class on each target element
        _.each(targets, function(target){
          target.$el.toggleClass(target.activeClass);

          // tick checkbox
          if (plugin.settings.checkbox){
            target.$el.find(':checkbox').prop('checked',
              target.$el.hasClass(target.activeClass)
            );
          }
        });

        // unbind
        if(plugin.settings.once) plugin.$el.unbind(plugin.settings.event);
      });

    },

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
