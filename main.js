// 1. Parsing snippets

var snippets = document.getElementById('snippets').innerHTML;
var startSnippet = /\s*@\(([0-9a-zA-Z]+)\)\(([0-9,]+)+\)----*\s*/g;
var allSnippets = [];
var lastSnippet = null;
var lines = snippets.split('\n');
for(var i = 0;i < lines.length;i++){
  var line = lines[i];
  var res = startSnippet.exec(line);
  if(res != null && res.length > 2)
  {
    lastSnippet = {
      title: lines[i+1],
      description: lines[i+3],
      lang: res[1],
      themes: res[2].split(','),
      content: lines[i+5]
    };

    allSnippets.push(lastSnippet);

    i=i+6;
  }
  else if(lastSnippet!= null)
  {
    lastSnippet.content += "\n" + line;
  }
}

// 2. Rendering view

var content = document.getElementById('content');

function appendSnippet(content,lastSnippet){
  lastSnippet.content = $('<div/>').text(lastSnippet.content).html();
  var div = "<div class='card'><h2>";
  for(var i = 0;i < lastSnippet.themes.length;i++){ div += "<div class='badge-" + lastSnippet.themes[i] + "'></div>"; }
  div += "<span>"+lastSnippet.title+"</span></h2><p>"+lastSnippet.description+"</p><pre><code class='"+lastSnippet.lang+"'>"+lastSnippet.content+"</code></pre></div>";
  content.innerHTML += div;
}

for(var i = 0;i < allSnippets.length;i++){
    appendSnippet(content,allSnippets[i]);
}

minigrid('#content', '.card',10);
window.addEventListener('resize', function(){
  minigrid('#content', '.card',10);
});

hljs.initHighlightingOnLoad();
