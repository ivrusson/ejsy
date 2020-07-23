function ejsy(options) {
  this.options = options ? options : {};
}

ejsy.prototype.loader = function(template) {
  var self = this;
  let baseUrl = self.options.baseUrl ? self.options.baseUrl : window.location.href;
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseText);
      }
    };
    var url = baseUrl + template;
    if(url.indexOf('.html') === -1) {
      url += '.html';
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  });
}

ejsy.prototype.render = function(el, template, context = {}, run) {
  var self = this;
  return new Promise(function(resolve, reject) {

    if(!el) {
      console.error('No element id defined');
      reject();
    }

    if(!template) {
      console.error('No template defined');
      reject();
    }
    self.loader(template)
    .then(function(str) {
      var output = ejs.render(str, context);
      jQuery(el).html(output);
      setTimeout(function() {
        if(typeof run === 'function') {
          run();
        }
      }, self.options.delay ? self.options.delay : 100);
      resolve();
    })
    .catch(function(err) {
      console.error(err);
      reject();
    });

  });
}

ejsy.prototype.compile = function(el, template, context = {}, run) {
  return new Promise(function(resolve, reject) {

    if(!el) {
      console.error('No element id defined');
      reject();
    }

    if(!template) {
      console.error('No template defined');
      reject();
    }

    if(ejs) {
      var output = ejs.render(template, context);
      jQuery(el).html(output);
      setTimeout(function() {
        if(typeof run === 'function') {
          run();
        }
      }, this.options.delay ? this.options.delay : 100);
      resolve();
    } else {
      console.error('EJS not loaded');
      reject();
    }

  });
}
