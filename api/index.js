var koa = require('koa');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');

var Model = require('./Model.js');
var Controller = require('./Controller.js');
var Router = require('./Router.js');

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
  tags: new Model('code-tags.db', {
    'value' : true,
    'color' : true,
  }),
  cards: new Model('code-cards.db', {
    'title' : true,
    'description' : true,
    'tags' : true,
    'snippet' : true,
  })
};

var controllers = {
  tags: new Controller(models.tags),
  cards: new Controller(models.cards),
};

var routes = {
  tags: new Router('/tags',controllers.tags),
  cards: new Router('/cards',controllers.cards),
};

for (var route in routes) {
  routes[route].register(app)
}

module.exports = app;
