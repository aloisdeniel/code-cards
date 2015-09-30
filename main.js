(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

// 1. Parsing snippets

var tags = $.QueryString["tags"];

if(tags)
{
  tags = tags.split(',');
}
else { tags = null; }

var allSnippets = [];
var allTags = [];

var snippetsNodes = $("script.snippet").each(function(index ) {

var snippetTags = $(this).data("tags").toString().split(',');

var isValid = tags == null;

if(!isValid)
{
  for (var i = 0; i < snippetTags.length && !isValid; i++) {
    isValid = $.inArray(snippetTags[i],tags) >= 0;
  }
}

if(isValid)
{
  allSnippets.push({
      title: $(this).data("title"),
      lang: $(this).data("lang"),
      description: $(this).data("description"),
      tags: snippetTags,
      content: $(this).html()
  });
}

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
    div += "<span class='tag tag-" + ((index - 1)  % 10) + "''>"+  allTags[index - 1] + "</span>";
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
