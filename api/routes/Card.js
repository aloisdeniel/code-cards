var route = require('koa-route');

var Card = function(path,controller) {
  this.path = path;
  this.controller = controller
}

Card.prototype.register = function(app) {
  app.use(route.get(this.path, this.controller.all()));
  app.use(route.post(this.path, this.controller.create()));
  app.use(route.get(this.path + "/{id}", this.controller.read()));
  app.use(route.post(this.path + "/{id}", this.controller.update()));
  app.use(route.delete(this.path + "/{id}", this.controller.delete()));
};

module.exports = Card;
