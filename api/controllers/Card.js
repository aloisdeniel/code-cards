var extend = require('extend');

var Card = function(model) {
  this.model = model
}

Card.prototype.all = function(){
  var model = this.model;
  return function*() {
    var offset = parseInt(this.request.query.offset);
  	var limit = parseInt(this.request.query.limit);
  	var tags = this.request.query.tags ? this.request.query.tags.split(",") : null;

    this.body = {};
    this.body.cards = yield model.all(offset,limit,tags);

  /*  this.body.allTags = yield model.tags();*/
    this.body.tags = tags ? tags : [];
  };
};

Card.prototype.create = function() {
  var model = this.model;
  return function*() {
    var entity = this.request.body;
    try {
    this.body = yield model.create(entity);
    } catch (e) {
      e.status = 400;
      throw e;
    }
  };
};

Card.prototype.read = function() {
  var model = this.model;
  return function*(id) {
    this.body = yield model.read(id);
  };
};

Card.prototype.update = function() {
  var model = this.model;
  return function*(id) {
    var bodyEntity = this.request.body;
    var dbEntity = yield model.read(id);
    var mergedEntity = extend({}, dbEntity, bodyEntity);
    delete mergedEntity._id;
    this.body = yield model.update(id,mergedEntity);
  };
};

Card.prototype.delete = function() {
  var model = this.model;
  return function*(id) {
    this.body = yield model.delete(id);
  };
};

module.exports = Card;
