
<template>
  <div class="subheader">
    <a class="button" v-link="{ path: '/create' }"><i class="ion-plus-round"></i></a>
    <h1>{{title}}</h1>
  </div>
  <div class="home-content">
    <div class="card" v-repeat="cards">
      <h2>
        <span v-repeat="tags" class="tag">{{$value}}</span>
        {{title}}
      </h2>
      <p v-if="description">{{description}}</p>
      <pre>
        <code class="{{language}}" v-transition="highlight">
          {{snippet}}
        </code>
      </pre>
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
      minigrid('.home-content', '.card', 10);
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
