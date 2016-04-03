//Stamp

var Stamp = React.createClass({
  getInitialState: function(){
    return {isEditing: false,
            yPosition: this.props.yPos}
  },
  componentWillMount(){
    this.setState({yPosition: this.props.yPos})
    this.style = {
      width: 200,
      height: 100,
      position: 'absolute',
      backgroundColor: 'red',
      borderRadius: 10,
      left: 145,
      top: this.state.yPosition - 50 //To align mouse click with stamp tip
    };
  },
  componentDidMount: function(){
    $(this.getDOMNode()).draggable();
  },
  swapSides: function(){
    alert('this swaps sides');
  },
  edit: function(){
    this.setState({isEditing: true});
  },
  remove: function(){
    this.props.onRemove(this.props.index);
  },
  save: function(){
    this.props.onChange(this.refs.newText.value, this.props.index);
    this.setState({isEditing: false})
  },
  renderDisplay: function(){
    return (
      <div id='stamptail' style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.swapSides} className='btn btn-primary glyphicon glyphicon-resize-horizontal'/>
          <button onClick={this.edit} className='btn btn-primary glyphicon glyphicon-pencil'/>
          <button onClick={this.remove} className='btn btn-danger glyphicon glyphicon-trash'/>
        </span>
      </div>
    );
  },
  renderForm: function(){
    return (
      <div id='stamptail' style={this.style}>
        <textarea ref="newText" id='stampform' className='form-control' defaultValue={this.props.children}></textarea>
        <button onClick={this.save} className='btn btn-success btn-sm glyphicon glyphicon-floppy-disk'/>
      </div>
    );
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

///////////////////////////////////////////////////////////////////////////////

var Editor = React.createClass({
  getInitialState: function(){
    return {
      isClicked: false,
      positionX: 0,
      positionY: 0,
      stamps: [],
      currentMouseY: 0
    };
  },
  nextId: function(){
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
  componentWillMount: function(){
  },
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/ruby");

    var reactComp = this;
    editor.on('gutterclick', function(e){
      reactComp.handleGutterClick(e);
    });

    editor.setValue(this.props.codeBlock);
  },
  handleGutterClick: function(clickEvent){
    this.setState({
                   positionX: clickEvent.clientX,
                   positionY: clickEvent.clientY,
                 });
    this.addStamp();
  },
  addStamp: function(text){
    var arr = this.state.stamps;
    arr.push({
      id: this.nextId(),
      stamp: text
    });
    this.setState({stamps: arr});
  },
  update: function(newText, i){
    var arr = this.state.stamps;
    arr[i].stamp = newText;
    this.setState({stamps:arr});
  },
  remove: function(i){
    var arr = this.state.stamps;
    arr.splice(i, 1);
    this.setState({stamps: arr});
  },
  eachStamp: function(stamp, i){
    return (<Stamp key={stamp.id}
              index={i}
              onChange={this.update}
              onRemove={this.remove}
              yPos={this.state.positionY}
            >{stamp.stamp}</Stamp>);
  },
  render: function(){
    return (
      <div>
        <button onClick={this.edit} className='btn btn-primary glyphicon glyphicon-pencil'/> 
        {this.state.stamps.map(this.eachStamp)}
        <div id="editor" className='col-lg-6 col-lg-offset-3'>

        </div>
      </div>
    )
  }
});
