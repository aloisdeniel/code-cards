var Datastore = require('nedb');
var db = new Datastore({ filename: 'code-cards.db', autoload: true });

function *all() {

}

module.exports = {
  all: all,
};
