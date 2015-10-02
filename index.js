var koa = require('koa');
var json = require('koa-json');
var route = require('koa-route');
var serve = require('koa-static');
var controllers = require('./controllers');

var port = 3000;

var app = koa();

function router(app,path,controller) {
  app.use(route.get(path, controller.all));
  app.use(route.post(path, controller.create));
  app.use(route.post(path + "/{id}", controller.read));
  app.use(route.delete(path + "/{id}", controller.delete));
};

router(app,"/api/tags",controllers.tags);
router(app,"/api/cards",controllers.cards);

app.use(serve(__dirname + '/public'));

app.listen(port);

console.log("[Code-Cards] Server started on port " + port)
