// Styles

require('../node_modules/highlight.js/styles/tomorrow-night.css')
require('./css/main.css')

// Application

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

var $ = require('jquery');
var minigrid = require('minigrid');
var Vue = require('vue');
var VueRouter = require('vue-router');
var HomePage = require('./pages/home.vue');
var EditPage = require('./pages/edit.vue');
var App = require('./app.vue');

Vue.transition('slidedown', {});

Vue.filter('unique-index', function (value, max) {

  var hash = 0, i, chr, len;
  if (value.length == 0) return hash;
  for (i = 0, len = value.length; i < len; i++) {
    chr   = value.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash % max;
})

Vue.use(VueRouter);

var router = new VueRouter();

router.map({
  '/' : { name: 'home', component: HomePage },
  '/create' : { name: 'create', component: EditPage},
  '/:id/edit' : {name: 'edit', component: EditPage}
})

var app = Vue.extend(App);

router.start(app,'#app')
router.app.$on('route-go', function (path) {
  router.go(path);
});

$(window).resize(debounce(function(){
  minigrid('.home-content', '.mdl-card', 15);
}, 250));
