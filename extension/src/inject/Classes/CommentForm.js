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
  render: function() {
    return (
      React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit},
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}),
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}),
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});