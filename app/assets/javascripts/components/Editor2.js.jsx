
var Editor2 = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/ruby");

    new Document('this is it')
  },
  render: function(){
    return (
      <div id="editor" className='col-lg-6 col-lg-offset-3'>
       
      </div>
    )
  }
});
