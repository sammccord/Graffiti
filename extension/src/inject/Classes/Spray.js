var Spray = React.createClass({
    displayName: 'Spray',
    getInitialState: function() {
        //Anti pattern but fuck it.
        return this.props.spray
    },
    componentDidMount: function() {
        console.log('Spray mount', this.state);
        modules.on('Spray:' + this.state._id, function(response) {
            console.log('Spray Response:', response.err, response.data);
            this.setState(response.data);
        }.bind(this))

        modules.send({
            action: 'Spray:' + this.state._id,
            method: 'GET',
            args: {
                _id: this.state._id
            }
        })
    },
    render: function() {
        console.log('spray render', this.state);
        var Comments = this.state.comments.map(function(commentData) {
            console.log(commentData);
            return React.createElement(Comment, {
                comment: commentData
            })
        });
        return (
            React.createElement('li', {
                    className: 'Spray'
                },
                React.createElement('h1', null, 'Spray'),
                React.createElement('ul', null,
                    Comments
                )
            )
        )
    }
})
