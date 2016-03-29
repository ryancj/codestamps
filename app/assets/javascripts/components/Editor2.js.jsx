var Stamp = React.createClass({
  render: function(){
    var styles = {width: 200, height: 100, backgroundColor: 'blue',
               position: 'absolute', left: 165, top: this.props.yPos}
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
    this.setState({isEditing: true,
                   positionX: clickEvent.clientX,
                   positionY: clickEvent.clientY});
                   console.log(this.state.positionX)
                   console.log(this.state.positionY)
  },
  render: function(){
    if (this.state.isEditing) {
      var annotationBox = <Stamp xPos={this.state.positionX} yPos={this.state.positionY}/>;
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
