<style>
.home-content
{
  margin: auto;
}

.action-bar
{
    position: fixed;
    right: 40px;
    top: 80px;
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
  color: #aaa;
}

.mdl-card__supporting-text h4 {
  padding: 0px;
  margin: 0px;
  font-size: 18px;
  color: #1d1f21;
}

 .mdl-card__menu {
  color: #fff;
}

.mdl-card__actions a {
  float: right;
}

.tag
{
  background: #b294bb;
  color: #fff;
  font-weight: bold;
  font-family: 'Source Sans Pro', sans-serif;
  display: block;
  float: left;
  font-size: 12px;
  padding: 2px 5px;
  margin-top:  7px;
  margin-left: 4px;
  border-radius: 2px;
}
.action-bar .mdl-button--colored {
  color: #fff;
    background-color: #b294bb;
}

.action-bar .mdl-button--colored:hover {
  color: #ddd;
    background-color: #1d1f21;
}

.tag-0 {background: #b294bb;  color: #fff; }
.tag-1 {background: #cc6666;  color: #fff; }
.tag-2 {background: #de935f;  color: #fff; }
.tag-3 {background: #f0c674;  color: #111; }
.tag-4 {background: #b5bd68;  color: #111; }
.tag-5 {background: #8abeb7;  color: #111; }
.tag-6 {background: #81a2be;  color: #fff; }
.tag-7 {background: #b294bb;  color: #fff; }
.tag-8 {background: #1d1f21;  color: #fff; }
.tag-9 {background: #ccc;  color: #111; }

</style>

<template>

    <div class="home-content">

        <div class="action-bar mdl-layout--large-screen-only">
          <a class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" v-link="{ path: '/create'}">
              <i class="material-icons">add</i>
          </a>
        </div>
      <div v-if="cards.length == 0">
        <p>Not cards</p>
      </div>

      <div class="mdl-card mdl-shadow--2dp" v-repeat="card in cards" v-transition="fade">
        <pre class="mdl-card__title" v-if="card.snippet">
            <code class="{{card.language}}" v-transition="highlight">{{card.snippet}}</code>
        </pre>
        <div class="mdl-card__supporting-text">
          <h4 v-if="card.title">{{card.title}}</h4>
          <p v-if="card.description">{{card.description}}</p>
        </div>
        <div class="mdl-card__actions mdl-card--border">

          <span v-repeat="card.tags" class="tag tag-{{$value | unique-index 10}}">{{$value}}</span>

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
  route: {
    activate: function (transition) {

      if(this.$route.query.tags){
        this.tags = this.$route.query.tags;
        console.log('Search for tags : ' + this.tags);
      }

      this.update();

      this.$on('search', function (tags) {
        this.tags = tags;
        console.log('Update search with tags : ' + this.tags);
        this.update();
      });

      transition.next()
    }
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

      var query = '';
      if(this.tags){
        query += '?tags=' + this.tags.join(',');
      }

      $.get('/api/cards'+query, function(data){
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
