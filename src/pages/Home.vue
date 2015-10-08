<style>
.action-bar
{
    position: absolute;
    right: 40px;
    bottom: 40px;
    z-index: 999;
}

.mdl-card {
  width: 512px;
  min-height: 0px;
}

.mdl-card__title {
  background-color: #1d1f21;
}

.mdl-card__supporting-text p {
  padding: 0px;
  margin: 0px;
  background: transparent;
  font-size: 12px;
}

.mdl-card__supporting-text h4 {
  padding: 0px;
  margin: 0px;
  font-size: 17px;
}

 .mdl-card__menu {
  color: #fff;
}

.mdl-card__actions a {
  float: right;
}



</style>

<template>
    <div class="home-content">
      <div class="action-bar">
      <a class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" v-link="{ path: '/create'}">
          <i class="material-icons">add</i>
      </a>

      </div>

      <div class="mdl-card mdl-shadow--2dp" v-repeat="card in cards">
        <pre class="mdl-card__title" v-if="card.snippet">
            <code class="{{card.language}}" v-transition="highlight">{{card.snippet}}</code>
        </pre>
        <div class="mdl-card__supporting-text">
          <h4 v-if="card.title">{{card.title}}</h4>
          <p v-if="card.description">{{card.description}}</p>
        </div>
        <div class="mdl-card__actions mdl-card--border">

          <span v-repeat="card.tags" class="tag">{{$value}}</span>

          <a v-on='click: edit(card)' class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">more_vert</i>
          </a>

        </div>
      </div>
   </div>

</template>

<script>
var $ = require('jquery');
var minigrid = require('minigrid');
var hljs = require('highlight.js');

module.exports = {
  props: {
    cards: {type: Array, default: () => [] },
    tags: {type: Array, default: () => [] },
  },
  attached: function(){
    this.update();
  },
  watch: {
    cards: function(val,oldVal) {
        $('pre code').each(function(i,b){
          hljs.highlightBlock(b);
        })
      minigrid('.home-content', '.mdl-card', 15);
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

    edit: function(card){
      console.log(card)
        this.$dispatch('route-go', '/'+card._id+'/edit');
    }
  }
};
</script>
