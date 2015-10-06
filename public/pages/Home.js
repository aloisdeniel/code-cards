var HomePage = Vue.extend({
  template: '<div class="card" v-repeat="cards"> <h2> <span v-repeat="tags" class="tag">{{value}}</span> {{title}} </h2> <p>{{description}}</p> <pre> <code class="{{language}}" v-transition="highlight"> {{snippet}} </code> </pre> </div>',
  props: {
    cards: {type: Array, default: [] },
    tags: {type: Array, default: [] },
  },
  attached: function(){
    this.update();
  },
  watch: {
    cards: function(val,oldVal) {
      console.log(' update watch')
        $('pre code').each(function(i,b){
          hljs.highlightBlock(b);
        })
      minigrid('#app', '.card', 10);
    }
  },
  methods: {
    /*
     * Loads distant cards and tags from api.
     */
    update: function() {
      console.log('start update')
      var vm = this;
      $.get('/api/cards', function(data){
        vm.cards = data.cards;
      });
    }
  }
});
