<style>


.create-action-bar .right
{
    float: right;
}
	.create-action-bar
	{
		margin: auto;
		width: 512px;
	}

	.create-card
	{
		margin: 5% auto 2% auto;
	}

	.create-card .code
	{
		background: #1d1f21;
	}

	.create-card .code textarea
	{
		font-family: monospace;
		border-radius: 3px;
		background: transparent;
		width: 100%;
		margin: 0%;
		border: 0px;
		padding:  2% 5%;
		color:#c5c8c6;
		min-height: 250px;
	}

	.create-card .fields textarea,	.create-card .fields input,	.create-card .fields select
	{
		font-family: "Roboto","Helvetica","Arial",sans-serif;
		font-size: 12px;
		display: block;
		width: 100%;
		padding:  2% 5%;
	}
</style>

<template>
	<div>
		<div class="create-card mdl-card mdl-shadow--4dp">
			<div class="code">
					<textarea v-model="snippet" placeholder="Code"></textarea>
			</div>
			<div class="fields">
				<input  v-model="title" class="title" type="text" placeholder="Title">
				<textarea  v-model="description" class="description" placeholder="Description"></textarea>
				<input  v-model="tags" class="tags" type="text" placeholder="Tags (separated by spaces)"></input>
				<select  v-model="language" class="languages" name="language" options="languages"></select>
			</div>
		</div>

		<div class="create-action-bar">
			<a class="mdl-button mdl-js-button mdl-button--fab" v-link="{ path: '/' }">
			  <i class="material-icons">close</i>
			</a>
			<a v-on="click: done" class="right mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
			  <i class="material-icons">check</i>
			</a>
			<a v-if='id' v-on="click: delete" class="right mdl-button mdl-js-button mdl-button--fab" style="margin-right: 30px;">
			  <i class="material-icons">delete</i>
			</a>
		</div>
	</div>
</template>


<script>
var $ = require('jquery');

module.exports = {
		data: function () { return {
			id: null,
			snippet: "",
			title: "",
			description: "",
			tags: "",
			language: ""
		}},
	  props: {
	      languages : {type: Array, default: () => [
	        'xml',
	        'cs',
	        'bash',
	        'cmake',
	        'coffeescript',
	        'cpp',
	        'css',
	        'go',
	        'gradle',
	        'java',
	        'json',
	        'javascript',
	        'objectivec',
	        'powershell',
	        'sql',
	        'swift',
	        'typescript'
	      ]}
	    },
			created: function(){
				if(this.$route.params.id){
					this.id = this.$route.params.id;
					this.initialize(this.id);
				}
			},
			methods: {
				initialize: function(id){
					var vm = this;
					$.get('/api/cards/'+id, function(data){
						vm.snippet = data.snippet;
						vm.title = data.title;
						vm.description = data.description;
						vm.tags = data.tags.join(" ");
						vm.language = data.language;
					});
				},
				delete: function() {
					var vm = this;
					$.ajax({
					    url: '/api/cards/'+this.id,
					    type: 'DELETE',
					    success: function(result) {
					        vm.$dispatch('route-go', '/')
					    }
					});
				},
				done: function() {
					var vm = this;
					var tags = this.tags.split(" ");
					tags = $.map(tags, function(n) { return n.trim(' ').toUpperCase();});
					tags = $.grep(tags, function(n) { return n != ''; });
					var body = {
						snippet: this.snippet,
						title: this.title,
						description: this.description,
						tags: tags,
						language: this.language
					};
					console.log(body);

					if(this.id != null){
						$.post('/api/cards/'+this.id, body)
						  .done(function( data ) {
								vm.$dispatch('route-go', '/')
						  });
					}
					else {
						tags.push(this.language.trim(' ').toUpperCase());
						$.post('/api/cards', body)
						  .done(function( data ) {
								vm.$dispatch('route-go', '/')
						  });
					}
				}
			}
};

</script>
