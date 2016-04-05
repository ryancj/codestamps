//Stamp Component

var Stamp = React.createClass({
  getInitialState: function(){
    return {isEditing: false,
            stampColor: 'color-green',
            stampTail: 'stamptail-green',
            yPosition: this.props.yPos,
            sidePos: 165}
  },
  componentWillMount(){
    this.setState({yPosition: this.props.yPos})
  },
  componentDidMount: function(){
    $(this.getDOMNode()).draggable();
  },
  changeColor: function(){
    if (this.state.stampColor === 'color-green'){
      this.setState({stampColor: 'color-pink'});
      this.setState({stampTail: 'stamptail-pink'});
    } else if (this.state.stampColor === 'color-pink'){
      this.setState({stampColor: 'color-purple'});
      this.setState({stampTail: 'stamptail-purple'});
    } else if (this.state.stampColor === 'color-purple'){
      this.setState({stampColor: 'color-blue'});
      this.setState({stampTail: 'stamptail-blue'});
    } else if (this.state.stampColor === 'color-blue'){
      this.setState({stampColor: 'color-green'});
      this.setState({stampTail: 'stamptail-green'});
    }
  },
  swapSides: function(){
    if (this.state.sidePos === 165){
      this.setState({sidePos: 1105});
      this.setState({stampTail: this.state.stampTail + '-right'});
    } else {
      this.setState({sidePos: 165});
      this.setState({stampTail: this.state.stampTail.replace('-right','')});
    }

    console.log(this.state.stampTail)
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
      <div className={this.state.stampColor} style={this.style} id={this.state.stampTail}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.changeColor} className='btn btn-primary btn-sm glyphicon glyphicon-tint'/>
          <button onClick={this.swapSides} className='btn btn-primary btn-sm glyphicon glyphicon-resize-horizontal'/>
          <button onClick={this.edit} className='btn btn-primary btn-sm glyphicon glyphicon-pencil'/>
          <button onClick={this.remove} className='btn btn-danger btn-sm glyphicon glyphicon-trash'/>
        </span>
      </div>
    );
  },
  renderForm: function(){
    return (
      <div className={this.state.stampColor} style={this.style} id={this.state.stampTail}>
        <textarea ref="newText" id='stampform' className='form-control' defaultValue={this.props.children}></textarea>
        <button onClick={this.save} className='btn btn-success btn-sm glyphicon glyphicon-floppy-disk'/>
      </div>
    );
  },
  render: function(){
    this.style = {
      width: 200,
      height: 100,
      position: 'absolute',
      borderRadius: 10,
      left: this.state.sidePos,
      top: this.state.yPosition + 18 //To align mouse click with stamp tip
    }

    if (this.state.isEditing) {
      return this.renderForm();
    }
    else {
      return this.renderDisplay();
    }
  }
});

///////////////////////////////////////////////////////////////////////////////

//Editor Component

var Editor = React.createClass({
  getInitialState: function(){
    return {
      theme: this.props.theme,
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
  componentDidMount: function(){
    var editor = ace.edit("editor");

    editor.$blockScrolling = Infinity //To prevent warning
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/" + this.state.theme);

    var reactComp = this;
    editor.on('gutterclick', function(e){
      reactComp.handleGutterClick(e);
    });

    editor.setValue(this.props.codeBlock);
    editor.setValue(editor.getValue(), -1); //To prevent highlighting all lines
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
    return (<Stamp
              key={stamp.id}
              index={i}
              onChange={this.update}
              onRemove={this.remove}
              yPos={this.state.positionY}
            >{stamp.stamp}</Stamp>);
  },
  render: function(){
    return (
      <div>
        {this.state.stamps.map(this.eachStamp)}
        <div id="editor" className='col-lg-6 col-lg-offset-3'>

        </div>
      </div>
    )
  }
});
