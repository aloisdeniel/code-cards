var koa = require('koa');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var Joi = require('joi');

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
  cards: new Model('code-cards.db', {
    'title' : Joi.string(),
    'description' : Joi.string(),
    'language' : Joi.string().allow(['xml', 'cs', 'bash', 'cmake', 'coffeescript', 'cpp', 'css', 'go', 'gradle', 'java', 'json', 'javascript', 'objectivec', 'powershell', 'sql', 'swift', 'typescript' ]),
    'tags' : Joi.array().items(Joi.string()),
    'snippet' : Joi.string()
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
