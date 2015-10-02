var Datastore = require('nedb');
var db = new Datastore({ filename: 'code-tags.db', autoload: true });

function *all() {

}

module.exports = {
  all: all,
};
