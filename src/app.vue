<style>

.mdl-layout__header {
background: #1d1f21;
z-index: 900;
}

.mdl-layout__header-row {
  padding-left: 15px;
}

.mdl-layout__header-row .mdl-layout-title {
  color :#bbb;
  font-family: monospace;
}


</style>

<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">> code.cards_</span>
          <div class="mdl-layout-spacer"></div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
            <label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-exp">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
              <input v-model="search | tag-list" v-on="keyup:filter | key 'enter'" class="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-exp" />
            </div>
        </div>
        </div>
    </header>
    <main class="mdl-layout__content">
        <div class="page-content">
            <router-view></router-view>
        </div>
    </main>
    </div>
</template>

<script>

module.exports = {
  data: {
    search : []
  },
  props: ["search"],
  methods: {
    filter: function(){
      console.log(this.$route)
      if(this.$route.name === 'home'){
        this.$broadcast('search', this.search );
      }
      this.$emit('route-go', { name: 'home', query: { tags: this.search } });
    }
  }
}
</script>
