var Datastore = require('nedb');
var Joi = require('joi');

var Model = function(dbFile, schema) {
  this.db = new Datastore({ filename: dbFile, autoload: true });
  this.schema = schema;
}

/*
private
*/

Model.prototype._clean = function(entity) {
  // TODO : remove all properties that are not into this.schema
  return entity;
}

Model.prototype._validate = function(entity) {
  var schema = this.schema;
  return new Promise(function(resolve,reject) {
    Joi.validate(entity, schema, function (err, value) {
      if(err)
      {
        err.status = 400;
        return reject(err);
      }
      resolve(value);
     });
  });
}

/*
 public
*/

Model.prototype.all = function(offset,limit) {
  var db = this.db;
  return new Promise(function(resolve,reject) {
     return db.find({}).skip(offset).limit(limit).exec(function(err,docs) {
       if(err !== null) return reject(err);
       resolve(docs);
     });
  });
};

Model.prototype.create = function(entity) {
  var db = this.db;
  entity = this._clean(entity);
  return this._validate(entity).then(function(r){
    return new Promise(function(resolve,reject) {
      db.insert(entity, function(err,docs) {
        if(err !== null) return reject(err);
        resolve(docs);
      });
   });
 });
};


Model.prototype.read = function(id) {
  var db = this.db;
  return new Promise(function(resolve,reject) {
    db.findOne({ _id: id }, function(err,docs) {
      if(err !== null) return reject(err);
      resolve(docs);
    });
 });
};

Model.prototype.update = function() {
  var db = this.db;
  entity = this._clean(entity);
  return new Promise(function(resolve,reject) {
    db.update({ _id: id }, entity, {},  function(err,docs) {
      if(err !== null) return reject(err);
      resolve(docs);
    });
 });
};

Model.prototype.delete = function() {
  var db = this.db;
  return new Promise(function(resolve,reject) {
    db.remove({ _id: id },{}, function(err,docs) {
      if(err !== null) return reject(err);
      resolve(docs);
    });
 });
};

module.exports = Model;
