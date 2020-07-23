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
    TE.render('#formContainer', 'components/form', { now: new Date() }, function() {
      $('.form')
      .form({
        on: 'blur',
        fields: {
          empty: {
            identifier  : 'empty',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter a value'
              }
            ]
          },
          dropdown: {
            identifier  : 'dropdown',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please select a dropdown value'
              }
            ]
          },
          checkbox: {
            identifier  : 'checkbox',
            rules: [
              {
                type   : 'checked',
                prompt : 'Please check the checkbox'
              }
            ]
          }
        }
      });
    })
    .then(function() {
      console.log('APP successfully rendered!');
    })
    .catch(function(err) {
      console.error('APP fails to render!');
    });
  }


  init();

})(jQuery);
