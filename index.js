var koa = require('koa');
var serve = require('koa-static');
var mount = require('koa-mount');
var api = require('./api');

var port = 3000;

// Creatinng app

var app = koa();

app.use(mount('/api', api));
app.use(serve(__dirname + '/public'));

// Starting server

app.listen(port);
console.log("[Code-Cards] Server started on port " + port)
