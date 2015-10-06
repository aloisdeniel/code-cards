var app = new Vue({
  el: '#app',
  data: {
    cards: [],
    tags: []
  },

  watch: {
    cards: function(val,oldVal) {
      console.log('updated list')
      hljs.initHighlightingOnLoad();
      minigrid('#content', '.card', 10);
    }
  },

  methods: {
    /*
     * Loads distant cards and tags from api.
     */
    update: function() {
      var vm = this;
      $.get('/api/cards', function(data){
        vm.cards = data.cards;
      });
    },

    /*
     * Adds a new card to the list.
     */
    addCard: function(card) {

    },

    /*
     * Edits a card.
     */
    editCard: function(card) {

    },

    /*
     * Removes an existing card from the list.
     */
     deleteCard: function(card) {

     }
  }
});

app.update();

window.addEventListener('resize', function(){
  minigrid('#content', '.card', 10);
});
