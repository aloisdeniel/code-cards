// Styles

require('../node_modules/highlight.js/styles/tomorrow-night.css')
require('./css/main.css')

// Application

var minigrid = require('minigrid');
var Vue = require('vue');
var VueRouter = require('vue-router');
var HomePage = require('./pages/home.vue');
var EditPage = require('./pages/edit.vue');
var App = require('./app.vue');

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
})

window.addEventListener('resize', function(){
  minigrid('.home-content', '.mdl-card', 15);
});
