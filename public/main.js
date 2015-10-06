var App = Vue.extend({});

var router = new VueRouter();

router.map({
  '/home' : { component: HomePage },
  '/create' : { component: CreatePage },
})

router.start(App,'#app')
