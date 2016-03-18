$(document).ready(function(){

  var editor = ace.edit("editor");

  editor.setTheme("ace/theme/tomorrow");
  editor.getSession().setMode("ace/mode/ruby");

});
