//Editor Component

var Editor = React.createClass({
  getInitialState: function(){
    return {
      theme: this.props.theme,
      positionX: 0,
      positionY: 0,
      stamps: this.props.stamps,
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
    var component = this;

    $.ajax({
        url: '/snippets/' + this.props.snippet_id + '/stamps',
        method: "POST",
        data: {state: {yPos: this.state.positionY}}
      }).done(function(res) {
        var arr = component.state.stamps;
        arr.push({
          id: res.stamp.id,
          yPos: component.state.positionY,
          stamp: text
        });
        component.setState({stamps: arr});
      });
  },
  update: function(newText, i){
    var component = this;

    var arr = component.state.stamps;
    arr[i].stamp = newText;

    $.ajax({
        url: '/stamps/' + arr[i].id,
        method: "PATCH",
        data: {state: arr[i]}
      }).done(function(res) {
        component.setState({stamps:arr});
      });
  },
  remove: function(i){
    var component = this;

    var arr = component.state.stamps;
    $.ajax({
        url: '/stamps/' + arr[i].id,
        method: "DELETE",
        data: {state: arr[i]}
      }).done(function(res) {
        arr.splice(i, 1);
        component.setState({stamps: arr});
      });
  },
  eachStamp: function(stamp, i){
    return (<Stamp
              key={stamp.id}
              index={i}
              onChange={this.update}
              onRemove={this.remove}
              yPos={stamp.yPos}
            >{stamp.stamp}</Stamp>);
  },
  render: function(){
    return (
      <div>
        {this.state.stamps.map(this.eachStamp)}
        <div id='editor' className='col-lg-6 col-lg-offset-3'>
        </div>
      </div>
    )
  }
});
