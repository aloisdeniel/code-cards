var Joi = require('joi');
var Schema = require('./schemas/Card.js');

var Card = function(db) {
  this.collection = db.collection("cards");
};

// Validation

Card.prototype.validate = function(entity) {
  return new Promise(function(resolve,reject) {
    Joi.validate(entity, Schema, function (err, value) {
      if(err) return reject(err);
      resolve(value);
     });
  });
}

// Cards

Card.prototype.all = function(offset,limit,tags) {

  var col = this.collection;

  if(tags){
    tags = { tags: { $all: tags } };
  }
  else {
    tags = {};
  }

  if(!limit)
    return new Promise(function(resolve,reject) {
      col.find(tags).toArray((e, v) => { if(e) return reject(e); resolve(v); });
    });

  if(!offset) offset = 0;

  return new Promise(function(resolve,reject) {
    col.find(tags).skip(offset).limit(limit).toArray((e, v) => { if(e) return reject(e); resolve(v); });
  });

}

Card.prototype.create = function(entity) {
  var col = this.collection;

  return this.validate(entity).then(function(r){
    return new Promise(function(resolve,reject) {
      col.insert(entity,(e, v) => { if(e) return reject(e); resolve(v); });
    });
  });
}

Card.prototype.delete = function(id) {
  var col = this.collection;
  return new Promise(function(resolve,reject) {
    col.remove({ _id: id },{}, (e, v) => { if(e) return reject(e); resolve(v); });
  });
}

Card.prototype.read = function(id) {
  var col = this.collection;
  return new Promise(function(resolve,reject) {
    col.findOne({ _id: id }, (e, v) => { if(e) return reject(e); resolve(v); });
  });
}

Card.prototype.update = function(id,entity) {
  var col = this.collection;
  return this.validate(entity).then(function(r){
    return new Promise(function(resolve,reject) {
      col.update({ _id: id }, entity, (e, v) => { if(e) return reject(e); resolve(v); });
    });
  });
}

// Tags

Card.prototype.tags = function() {
  return this.collection.distinct("tags",{});
}

module.exports = Card;
