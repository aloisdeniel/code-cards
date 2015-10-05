var Card = function(db) {
  this.collection = db.collection("cards");
};

function toPromise(req){
  return new Promise(function(resolve,reject) {
     return req.exec(function(err,docs) {
       if(err !== null) return reject(err);
       resolve(docs);
     });
  });
}

// Cards

Card.prototype.all = function(offset,limit) {
  return toPromise(this.collection.find({}).skip(offset).limit(limit));
}

Card.prototype.create = function(entity) {
  return toPromise(this.collection.insert(entity));
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

// Tags

Card.prototype.tags = function() {

}

module.exports = Card;
