<style>
.mdl-card {
  width: 512px;
}

.mdl-card__title {
  background-color: #ebebeb;
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

.mdl-card__actions button {
  float: right;
}
</style>

<template>
  <div class="home-content">
    <div class="demo-card-square mdl-card mdl-shadow--2dp" v-repeat="cards">
      <pre class="mdl-card__title mdl-card--expand">
          <code class="{{language}}" v-transition="highlight">{{snippet}}</code>
      </pre>
      <div class="mdl-card__supporting-text">
        <h4>{{title}}</h4>
        <p>{{description}}</p>
      </div>
      <div class="mdl-card__actions mdl-card--border">
      
        <span v-repeat="tags" class="tag">{{$value}}</span>
          
        <button id="menu-top-right-{{$index}}" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_vert</i>
        </button>
        
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="menu-lower-right-{{$index}}">
          <li class="mdl-menu__item">Edit</li>
          <li class="mdl-menu__item">Delete</li>
        </ul>
        
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
    title: {type: String, default: 'Home' },
    cards: {type: Array, default: () => [] },
    tags: {type: Array, default: () => [] },
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
      minigrid('.home-content', '.mdl-card', 10);
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
};
</script>
