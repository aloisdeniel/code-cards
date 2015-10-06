var App = Vue.extend({});

var router = new VueRouter();

router.map({
  '/home' : { component: HomePage },
  '/create' : { component: CreatePage },
})

router.start(App,'#app')

router.go('/home');

window.addEventListener('resize', function(){
  minigrid('.home-content', '.card', 10);
});
