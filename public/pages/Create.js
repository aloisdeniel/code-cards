var languageOptions = [
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
];

var languageSelect = '<select name="language">';
languageOptions.forEach(function(l){
  languageSelect += '<option value="'+l+'">'+l+'</option>';
});
languageSelect += '</select>';

var CreatePage = Vue.extend({
  template: '<div class="subheader"><a class="button"><i class="ion-checkmark-round"></i></a><a class="button negative" v-link="{ path: \'/home\' }"><i class="ion-close-round"></i></a><h1>{{title}}</h1></div><div class="card full"><h2><input type="text" placeholder="Title"></input></h2><p><textarea placeholder="Description"></textarea></p><p><input type="text" placeholder="Tags (separated by spaces)"></input></p><p>'+languageSelect+'</p><div class="snippet"><textarea placeholder="Code"></textarea></div> </div>',
  props: {
    title: {type: String, default: 'Create a new card' }
  }
});
