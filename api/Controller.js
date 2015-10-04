var Datastore = require('nedb');

var Controller = function(model) {
  this.model = model
}

Controller.prototype.all = function(){
  var model = this.model;
  return function*() {
    var offset = this.request.query.offset ? this.request.query.offset : 0;
  	var limit = this.request.query.limit ? this.request.query.limit : 2000;
    this.body = yield model.all(offset,limit);
  };
};

Controller.prototype.create = function() {
  var model = this.model;
  return function*() {
    var entity = this.request.body;
    this.body = yield model.create(entity);
  };
};

Controller.prototype.read = function() {
  var model = this.model;
  return function*(id) {
    this.body = yield model.read(id);
  };
};

Controller.prototype.update = function() {
  var model = this.model;
  return function*(id) {
    this.body = yield model.update(id);
  };
};

Controller.prototype.delete = function() {
  var model = this.model;
  return function*(id) {
    this.body = yield model.delete(id);
  };
};

module.exports = Controller;
