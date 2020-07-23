/*
  * EJSy Mini Framework
  * version: 1.0.0
  * author: ivrusson
*/

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

ejsy.prototype.loaderJS = function(src) {
  var self = this;
  let baseUrl = self.options.baseUrl ? self.options.baseUrl : window.location.href;
  var url = baseUrl + src;
  if(url.indexOf('.js') === -1) {
    url += '.js';
  }

  var prevEl = document.getElementById('#'+src);
  if(prevEl) prevEl.parentNode.removeChild(element);

  var script = document.createElement('script');
  script.id = src;
  script.onload = function () {
  };
  script.src = url;

  document.body.appendChild(script); //or something of the likes
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
        if(typeof run === 'string') {
          self.loaderJS(run)
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
        if(typeof run === 'string') {
          self.loaderJS(run)
        }
      }, this.options.delay ? this.options.delay : 100);
      resolve();
    } else {
      console.error('EJS not loaded');
      reject();
    }

  });
}
