var Stamp = React.createClass({
  getInitialState: function(){
    return {isEditing: false,
            stampColor: 'color-green',
            stampTail: 'stamptail-green',
            yPosition: this.props.yPos,
            sidePos: '15.9%'}
  },
  componentWillMount(){
    this.setState({yPosition: this.props.yPos})
  },
  componentDidMount: function(){
    $(this.getDOMNode()).draggable();
  },
  addComment: function(){
    var editor = ace.edit("editor");
    if (this.props.children === undefined){
      var commentToInsert = 'New Comment';
    } else {
      var commentToInsert = this.props.children
    }
    editor.insert('#' + commentToInsert + '\n');
  },
  changeColor: function(){ //I'm sure there's a better way to do this!
    if (this.state.stampColor === 'color-green'){
      this.setState({stampColor: 'color-pink'});
      if (this.state.sidePos === '15.9%'){
        this.setState({stampTail: 'stamptail-pink'});
      } else {
        this.setState({stampTail: 'stamptail-pink-right'});
      }
    } else if (this.state.stampColor === 'color-pink'){
      this.setState({stampColor: 'color-purple'});
      if (this.state.sidePos === '15.9%'){
        this.setState({stampTail: 'stamptail-purple'});
      } else {
        this.setState({stampTail: 'stamptail-purple-right'});
      }
    } else if (this.state.stampColor === 'color-purple'){
      this.setState({stampColor: 'color-blue'});
      if (this.state.sidePos === '15.9%'){
        this.setState({stampTail: 'stamptail-blue'});
      } else {
        this.setState({stampTail: 'stamptail-blue-right'});
      }
    } else if (this.state.stampColor === 'color-blue'){
      this.setState({stampColor: 'color-green'});
      if (this.state.sidePos === '15.9%'){
        this.setState({stampTail: 'stamptail-green'});
      } else {
        this.setState({stampTail: 'stamptail-green-right'});
      }
    }
  },
  swapSides: function(){
    if (this.state.sidePos === '15.9%'){
      this.setState({sidePos: '75.3%'});
      this.setState({stampTail: this.state.stampTail + '-right'});
    } else {
      this.setState({sidePos: '15.9%'});
      this.setState({stampTail: this.state.stampTail.replace('-right','')});
    }
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
      <div className={this.state.stampColor + ' stamp'} style={this.style} id={this.state.stampTail}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.addComment} className='btn btn-sm glyphicon glyphicon-indent-left'/>
          <button onClick={this.changeColor} className='btn btn-sm glyphicon glyphicon-tint'/>
          <button onClick={this.swapSides} className='btn btn-sm glyphicon glyphicon-resize-horizontal'/>
          <button onClick={this.edit} className='btn btn-sm glyphicon glyphicon-pencil'/>
          <button onClick={this.remove} className='btn btn-danger btn-sm glyphicon glyphicon-trash'/>
        </span>
      </div>
    );
  },
  renderForm: function(){
    return (
      <div className={this.state.stampColor + ' stamp'} style={this.style} id={this.state.stampTail}>
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
      top: parseInt(this.state.yPosition) + 18 //To align mouse click with stamp tip
    }

    if (this.state.isEditing) {
      return this.renderForm();
    } else {
      return this.renderDisplay();
    }
  }
});
