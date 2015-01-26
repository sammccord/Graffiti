var CommentForm = React.createClass({
	displayName: "CommentForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  handleFormView: function(){
  	console.log('handling view');
  },
  render: function() {
    return (
      React.createElement("form", {className: "commentForm graffiti-invisible", onSubmit: this.handleSubmit},
      	React.createElement("input", {type: "text", className: "form-control", placeholder: "Leave a comment", ref: "text"}),
      	React.createElement("input", {type: "text", className: "form-control", placeholder: "Your name", ref: "author"}),
        React.createElement("button", {type: "submit", className: 'btn btn-default'},'Submit comment')
      )
    );
  }
});