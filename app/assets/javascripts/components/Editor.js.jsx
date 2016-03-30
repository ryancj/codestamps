var Stamp = React.createClass({
  getInitialState: function(){
    return {isEditing: false}
  },
  componentWillMount(){
    this.style = {
      width: 200,
      height: 100,
      position: 'absolute',
      backgroundColor: 'red',
      borderRadius: 10,
      left: 145,
      top: this.props.yPos - 50
    };
  },
  componentDidMount: function(){
    $(this.getDOMNode()).draggable();
  },
  edit: function(){
    this.setState({isEditing: true})
  },
  save: function(){
    var val = this.refs.newText.getDOMNode().value;
    alert("TODO: Save note value" + val);
    this.setState({isEditing: false})
  },
  remove: function(){
    this.props.onRemove(this.props.index);
  },
  renderDisplay: function(){
    return (
      <div id='stamptail' style={this.style}>
        <span>
          <button onClick={this.edit} className='btn btn-primary glyphicon glyphicon-pencil'/>
          <button onClick={this.remove} className='btn btn-danger glyphicon glyphicon-trash'/>
        </span>
      </div>
    )
  },
  renderForm: function(){
    return (
      <div id='stamptail' style={this.style}>
        <textarea ref="newText" id='stampform' className='form-control'>Insert comment</textarea>
        <button onClick={this.save} className='btn btn-success btn-sm glyphicon glyphicon-floppy-disk'/>
      </div>
    )
  },
  render: function(){
    if (this.state.isEditing) {
      return this.renderForm();
    }
    else {
      return this.renderDisplay();
    }
  }
});

var Editor = React.createClass({
  propTypes: {
    count: function(props, propName) {
      if (typeof props[propName] !== "number"){
          return new Error('The count property must be a number');
      }
      if (props[propName] > 100) {
          return new Error("Creating " + props[propName] + " stamps is ridiculous");
      }
    }
  },
  getInitialState: function(){
    return {
      isClicked: false,
      positionX: 0,
      positionY: 0,
      stamps: []
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
    this.setState({isClicked: true,
                   positionX: clickEvent.clientX,
                   positionY: clickEvent.clientY});
                   console.log(this.state.positionX)
                   console.log(this.state.positionY)
  },
  render: function(){
    if (this.state.isClicked) {
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
