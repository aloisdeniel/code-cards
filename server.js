var koa = require('koa');
var serve = require('koa-static');
var mount = require('koa-mount');
var api = require('./api');

// Creatinng app

var app = koa();

app.use(mount('/api', api));
app.use(serve(__dirname + '/public'));

module.exports = {
  app: app,
  start: function(port) {
    app.listen(port);
    console.log("[Code-Cards] Server started on port " + port);
  }
};
