var history = require('connect-history-api-fallback');
var express = require('express');
var webapp = express();
var webappPort = process.env.port || 2600;

webapp.use(history());
webapp.use(express.static(__dirname + '/dist/'));
webapp.listen(webappPort, '0.0.0.0');