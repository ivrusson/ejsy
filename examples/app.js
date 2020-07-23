(function($) {

  var TE = new ejsy();

  TE.render('#root', 'components/hero', { now: new Date() }, function() {
    jQuery('#highlight').attr('style', 'background-color:yellow;color:red;');
  })
  .then(function() {
    console.log('APP successfully rendered!');
  })
  .catch(function(err) {
    console.error('APP fails to render!');
  });

})(jQuery);
