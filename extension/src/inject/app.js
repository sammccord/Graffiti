//modules.send({
	// action:"Domain","User"
	// method:"GET,POST,PUT,DELETE"
	// args: {domain:domain}
//})

//modules.on('action',function(response){
	//response.err and response.data
//})

//User data
var user = {};
//Domain data
var domain = {};
var token = '';
var current_domain;

modules.on('init',init)

function init() {

	chrome.storage.sync.get("token", function(data) {
      token = data.token;
      console.log(token);
  });

	//Prevent multiple inits per domain.
	if(document.domain.replace(/\./g, '+') === current_domain) return false;
	current_domain = document.domain.replace(/\./g, '+');

	$('body').prepend('<div id="graffiti-app"></div>');

var Comment = React.createClass({
	displayName: 'Comment',
  render: function() {
    return (
    	React.createElement("div", {className: "comment"},
        React.createElement("h2", null,
        	this.props.author
        ),
        this.props.children
      )
    );
  }
});

var CommentBox = React.createClass({
	displayName: "CommentBox",
  initialize: function() {
  	var state = this;

  		modules.on('Page',function(response){
  			if(response.err) console.log(response.err);
  			else{
  				console.log(response.data);
  				// state.setState({data:response.data});
  			}
  		})

  		modules.send({
  			action:'Page',
  			method: 'GET',
  			args:{
  				domain: document.domain,
  				path: window.location.pathname
  			}
  		})
  },
  handleCommentSubmit: function(data) {
    var comments = this.state.data;
    comments.push(data);
    this.setState({data: comments});//, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.

      //args here, is an object with data the action expects
      modules.send({action:'postEmbed',args:{}},function(response){
	  		console.log(response);
	  		//Standard node err, data convention
	  		if(response.err) return console.log(response.err)

	  		//state.setState({data:response.data});
	  	})

    //});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.initialize();
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"},
        React.createElement("h1", null, "Comments"),
        React.createElement(CommentList, {data: this.state.data}),
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});

	var CommentList = React.createClass({
		displayName: 'CommentList',
	  render: function() {
	    var commentNodes = this.props.data.map(function(comment, index) {
	      return (
	      	React.createElement(Comment,{author:comment.author,key:index},
	      		comment.text
	      	)
	        // `key` is a React-specific concept and is not mandatory for the
	        // purpose of this tutorial. if you're curious, see more here:
	        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
	      );
	    });
	    return (
	      React.createElement('div',{className:'commentList'},
	      	commentNodes
	      )
	    );
	  }
	});

	var CommentForm = React.createClass({
		displayName: 'CommentForm',
	  handleSubmit: function(e) {
	    e.preventDefault();
	    var author = this.refs.author.getDOMNode().value.trim();
	    var text = this.refs.text.getDOMNode().value.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.props.onCommentSubmit({author: author, text: text});
	    this.refs.author.getDOMNode().value = '';
	    this.refs.text.getDOMNode().value = '';
	    return;
	  },
	  render: function() {
	    return (
	    	React.createElement('form',{className:'commentForm',onSubmit:this.handleSubmit},
	    		React.createElement('input',{type:'text',placeholder:'Your name',ref:'author'}),
	    		React.createElement('input',{type:'text',placeholder:'Say something',ref:'text'}),
	    		React.createElement('input',{type:'submit',value:'post'})
	    	)
	    );
	  }
	});

	React.render(
	  React.createElement(CommentBox),
	  document.getElementById('graffiti-app')
	);
}