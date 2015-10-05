var Joi = require('joi');

var Schema = {
  'title' : Joi.string(),
  'description' : Joi.string(),
  'language' : Joi.string().allow(['xml', 'cs', 'bash', 'cmake', 'coffeescript', 'cpp', 'css', 'go', 'gradle', 'java', 'json', 'javascript', 'objectivec', 'powershell', 'sql', 'swift', 'typescript' ]),
  'tags' : Joi.array().items(Joi.string()),
  'snippet' : Joi.string()
};

var Card = function(db) {
  this.collection = db.collection("cards");
};

function toPromise(req){
  console.log(req)
  return new Promise(function(resolve,reject) {
     return req.exec(function(err,docs) {
       if(err !== null) return reject(err);
       resolve(docs);
     });
  });
}

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

  if(tags){
    tags = { tags: { $all: tags } };
  }
  else {
    tags = {};
  }

/*  if(!limit)
    return toPromise(this.collection.find(tags));

  if(!offset) offset = 0;*/
  var col = this.collection;
  return new Promise(function(resolve,reject) {
    col.find(tags, (e, v) => { if(e) return reject(e); resolve(v); });
  });
}

Card.prototype.create = function(entity) {
  return this.validate(entity).then(function(r){
    return toPromise(this.collection.insert(entity))
  });
}

Card.prototype.delete = function(id) {
  return toPromise(this.collection.remove({ _id: id },{}));
}

Card.prototype.read = function(id) {
  return toPromise(this.collection.findOne({ _id: id }));
}

Card.prototype.update = function(id,entity) {
  return toPromise(this.collection.update({ _id: id }, entity));
}

Card.prototype.find = function(tags) {
  return toPromise(this.collection.find({ tags: { $all: tags } }));
}

// Tags

Card.prototype.tags = function() {
  return toPromise(this.collection.distinct("tags",{}));
}

module.exports = Card;
