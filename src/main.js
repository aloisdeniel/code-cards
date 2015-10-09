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

// Dependencies
var $ = require('jquery');
var minigrid = require('minigrid');
var Vue = require('vue');
var VueRouter = require('vue-router');

// Application
var App = require('./app.vue');

// Pages
var HomePage = require('./pages/home.vue');
var EditPage = require('./pages/edit.vue');

// Filters
Vue.filter('unique-index', require('./filters/unique-index.js'));
Vue.filter('tag-list', require('./filters/tag-list.js'));

// Routing
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
  console.log('Navigating ' + path);
  router.go(path);
});

$(window).resize(debounce(function(){
  minigrid('.home-content', '.mdl-card', 15);
}, 250));
