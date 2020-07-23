const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static('examples'));

app.get('/', function(req, res) {

  res.sendFile(path.join(__dirname, 'examples', 'index.html'));
});

app.listen(8080, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 8080!');
});
