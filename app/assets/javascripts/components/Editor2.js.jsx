var Stamp = React.createClass({
  render: function(){
    var styles = {width: 200, height: 100, backgroundColor: 'red', }
    return <div style={styles}>Stamp</div>
  }
});

var Editor2 = React.createClass({
  getInitialState: function(){
    return {
      isEditing: false,
      positionX: 0,
      positionY: 0
    }
  },
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/ruby");

    var reactComp = this;
    editor.on('gutterclick', function(e){
      reactComp.handleGutterClick(e);
    });
  },
  handleGutterClick: function(clickEvent){
    console.log('Gutter Clicked')
    this.setState({isEditing: true,
                   positionX: clickEvent.clientX,
                   positionY: clickEvent.clientY});
  },
  render: function(){
    if (this.state.isEditing) {
      var annotationBox = <Stamp/>;
    } else {
      var annotationBox = null;
    }
    return (
      <div>
        {annotationBox}
        <div id="editor" className='col-lg-6 col-lg-offset-3'>

        </div>
      </div>
    )
  }
});
