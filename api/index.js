var koa = require('koa');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var Joi = require('joi');
var Controller = require('./controllers');
var Route = require('./routes');
var Model = require('./models');

module.exports = function(db) {

  var app = koa();

  // Middlewares

  app.use(bodyParser());
  app.use(json({ pretty: false, param: 'pretty' }));
  app.use(function *(next) {
    try {
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      this.body = err.message;
      this.app.emit('error', err, this);
    }
  });


  // Routes

  var models = {
    card: new Model.Card(db)
  };

  var controllers = {
    card: new Controller.Card(models.card)
  };

  var routes = {
    card: new Route.Card('/cards',controllers.card)
  };

  for (var route in routes) {
    routes[route].register(app)
  }

  return app;
}
