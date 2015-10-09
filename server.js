var koa = require('koa');
var serve = require('koa-static');
var mount = require('koa-mount');
var Db = require('tingodb')().Db;
var api = require('./api');
var cards = require('./api/models').cards;

// database

var db = new Db('data', {});

// Creating app

var app = koa();

app.use(mount('/api', api(db)));
app.use(serve(__dirname + '/public'));

module.exports = {
  app: app,
  start: function(port) {
    app.listen(port);
    console.log("[Code-Cards] Server started on port " + port);
  }
};
