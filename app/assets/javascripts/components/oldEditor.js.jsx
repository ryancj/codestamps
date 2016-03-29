var Stamp = React.createClass({
  getInitialState: function(){
    return {opacity: '1'}
  },
  deleteStamp: function(){
    var stamp = this.getDOMNode();
 React.unmountComponentAtNode(stamp);
 $(stamp).remove();
  },
  render: function(){
    console.log("STAMP", this.props)
    var styles = {width: '200px', height: '100px',
        backgroundColor: 'red', opacity: this.state.opacity,  position: 'absolute', left: '160px'}
    return <div style = {styles}><div onClick={this.deleteStamp}>X</div>Stamp</div>
  }
});

var oldEditor = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
      positionX: 0,
      positionY: 0,
      numberOfStamps: 0
    };
  },
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/ruby");

    var react_comp = this;
    editor.on("gutterclick", function(e) {
      react_comp.handleGutterClick(e);
    })
  },
  handleGutterClick: function(mouse_event) {
    console.log("CLICKED ON GUTTER", mouse_event);
    this.setState({isEditing: true, numberOfStamps: this.state.numberOfStamps + 1,
         positionX: mouse_event.clientX, positionY: mouse_event.clientY});
  },
  render: function(){
    if (this.state.isEditing) {
      var annotationBox = <Stamp position-x={this.state.positionX} position-y={this.state.positionY} />
    } else {
      var annotationBox = null;
    }
    return <div>
      {annotationBox}
      <div id="editor" className='col-lg-6 col-lg-offset-3'>

      </div>
    </div>
  }
});
