// 1. Parsing snippets

var allSnippets = [];
var allTags = [];

var snippetsNodes = $("code.snippet").each(function(index ) {
  allSnippets.push({
      title: $(this).attr("cc-title"),
      lang: $(this).attr("cc-lang"),
      description: $(this).attr("cc-description"),
      tags: $(this).attr("cc-tags").split(','),
      content: $(this).html()
  });
});

// 2. Rendering view

$("#tags li").each(function(index ) {
  allTags.push($(this).html());
  $(this).addClass("tag-"+(index+1))
});

var content = document.getElementById('content');

function appendSnippet(content,lastSnippet){
  lastSnippet.content = $('<div/>').text(lastSnippet.content).html();
  var div = "<div class='card'><h2>";
  var tagValues = "";
  for(var i = 0;i < lastSnippet.tags.length;i++){

    var index = parseInt(lastSnippet.tags[i]);

    //div += "<div class='badge badge-" + index + "'></div>";
    //tagValues += "<span class=tag-" + index + ">"+  allTags[index - 1] + "</span>";
    div += "<span class='tag tag-" + index + "''>"+  allTags[index - 1] + "</span>";
  }


  div += "<span>"+lastSnippet.title+"</span></h2><p>"+lastSnippet.description+"</p><pre><code class='"+lastSnippet.lang+"'>"+lastSnippet.content+"</code></pre></div>";
  content.innerHTML += div;
}

for(var i = 0;i < allSnippets.length;i++){
    appendSnippet(content,allSnippets[i]);
}

hljs.initHighlightingOnLoad();

minigrid('#content', '.card', 10);
window.addEventListener('resize', function(){
  minigrid('#content', '.card', 10);
});
