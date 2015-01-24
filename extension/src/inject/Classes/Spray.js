var Spray = React.createClass({
    displayName: 'Spray',
    getInitialState: function() {
        //Anti pattern but fuck it.
        return this.props.spray
    },
    componentDidMount: function() {
        modules.on('Spray:' + this.state._id, function(response) {
            console.log('Spray Response:', response.err, response.data);
            this.setState(response.data);
        }.bind(this))

        modules.on('Comment:CREATE',function(response){
        	console.log('Comment Response:', response.err, response.data);
        	// this.setState(response.data)
        }.bind(this));

        modules.send({
            action: 'Spray:' + this.state._id,
            method: 'GET',
            args: {
                id: this.state._id
            }
        })
    },
    handleCommentSubmit: function(comment) {
        console.log(comment);
        var sprayId = this.state._id;
        modules.send({
            action: 'Comment:CREATE',
            method: 'POST',
            args: {
            		id: sprayId,
                name: comment.author,
                text: comment.text,
            }
        })
    },
    render: function() {
    		console.log(this.state);
        var Comments = this.state.comments.map(function(commentData) {
            return React.createElement(Comment, {
                comment: commentData,
                key: commentData._id
            })
        });
        return (
            React.createElement('li', {
                    className: 'Spray Spray-' + this.state._id
                },
                React.createElement(CommentForm, {
                    onCommentSubmit: this.handleCommentSubmit
                }),
                React.createElement('ul', null,
                    Comments
                )
            )
        )
    }
})
