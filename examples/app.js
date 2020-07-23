(function($) {

  var TE = new ejsy();

  function init() {
    TE.render('#root', 'components/hero', { now: new Date() }, function() {
      $('#highlight').attr('style', 'background-color:yellow;color:red;');
      $('#doSomething').bind('click', function(e) {
        e.preventDefault();
        renderForm();
      })
    })
    .then(function() {
      console.log('APP successfully rendered!');
    })
    .catch(function(err) {
      console.error('APP fails to render!');
    });
  }

  function renderForm() {
    TE.render('#formContainer', 'components/form', { now: new Date() }, 'components/form')
    .then(function() {
      console.log('Form successfully rendered!');
    })
    .catch(function(err) {
      console.error('Form fails to render!');
    });
  }


  init();

})(jQuery);
