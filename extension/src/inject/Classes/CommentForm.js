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
    	React.createElement('button',{
    		className: 'add-comment-button',
    		onClick: this.handleFormView
    }),
      React.createElement("form", {className: "commentForm graffiti-invisible", onSubmit: this.handleSubmit},
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}),
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}),
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});