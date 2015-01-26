var Spray = React.createClass({
    displayName: 'Spray',
    // getInitialState: function() {
    //     //Anti pattern but fuck it.
    //     return this.props.spray
    // },
    // componentDidMount: function() {
    //     modules.on('Spray:' + this.state._id, function(response) {
    //         console.log('Spray Response:', response.err, response.data);
    //         this.setState(response.data);
    //     }.bind(this))

    //     modules.send({
    //         action: 'Spray:' + this.state._id,
    //         method: 'GET',
    //         args: {
    //             id: this.state._id
    //         }
    //     })
    // },
    addSprayFocus: function(){
    	$('[data-graffiti-id="'+this.props.spray._id+'"]').addClass('graffiti-focus');
    },
    removeSprayFocus: function(){
    	$('[data-graffiti-id="'+this.props.spray._id+'"]').removeClass('graffiti-focus');
    },
    render: function() {
        var Comments = this.props.spray.comments.map(function(commentData) {
            return React.createElement(Comment, {
                comment: commentData,
                key: commentData._id
            })
        });
        return (
            React.createElement('li', {
                    className: 'Spray Spray-' + this.props.spray._id+' graffiti-invisible graffiti-visible',
                    onMouseEnter: this.addSprayFocus,
	                  onMouseLeave: this.removeSprayFocus
                },
                React.createElement('ul', {className:'SprayComments'},
                    Comments
                )
            )
        )
    }
})
