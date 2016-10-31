var history = require('connect-history-api-fallback');
var express = require('express');
var webapp = express();
var webappPort = process.env.port || 2600;

webapp.use(history());
webapp.use(express.static(__dirname + '/dist/'));
webapp.listen(webappPort, '0.0.0.0');
var express = require('express')
var server = express();

server.get('/hello', function(req, res) {
    res.send('GET tests working');
});

server.post('/hello', function(req, res) {
    res.send('POST tests working');
});

server.put('/hello', function(req, res) {
    res.send('PUT tests working');
});

server.delete('/hello', function(req, res) {
    res.send('DELETE tests working');
});

server.listen(3000, function() {
    console.log('Server started');
});