var Datastore = require('nedb');

var Model = function(dbFile, structure) {
  this.db = new Datastore({ filename: dbFile, autoload: true });
  this.structure = structure;
}

/*
private
*/

Model.prototype._clean = function(entity) {

  var result = {};

  for (var key in this.structure) {
    result[key] = entity[key];
  }

  return result;
}

Model.prototype._validate = function(entity) {

  var err = new Error('Invalid argument');
  err.status = 400;

  if(!entity)
    throw err;

  for (var key in this.structure) {
    if(this.structure[key] && typeof entity[key] == 'undefined')
    {
      throw err;
    }
  }
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
  this._validate(entity);
  entity = this._clean(entity);
  return new Promise(function(resolve,reject) {
    db.insert(entity, function(err,docs) {
      if(err !== null) return reject(err);
      resolve(docs);
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
