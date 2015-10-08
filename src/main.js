// Styles

require('./css/main.css')

// Application

var minigrid = require('minigrid');
var Vue = require('vue');
var VueRouter = require('vue-router');
var HomePage = require('./pages/home.vue');
var CreatePage = require('./pages/create.vue');
var App = require('./app.vue');

Vue.use(VueRouter);

var router = new VueRouter();

router.map({
  '/home' : { component: HomePage },
  '/create' : { component: CreatePage }
})


var app = Vue.extend(App);
router.start(app,'#app')

router.go('/home');

window.addEventListener('resize', function(){
  minigrid('.home-content', '.card', 10);
});
