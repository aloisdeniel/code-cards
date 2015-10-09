var $ = require('jquery');

module.exports = {
    read:function (val) {
      if(!val) return '';
      return val.join(" ");
    },
    write: function(val,old) {

      if(!val) return [];
      var tags = val.split(" ");
      tags = $.map(tags, function(n) { return n.trim(' ').toUpperCase();});
      return tags;
    }
};
