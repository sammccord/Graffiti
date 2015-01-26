var Comment = React.createClass({
    displayName: 'Comment',
    render: function() {
        var name = this.props.comment.name ? this.props.comment.name : '';
        var text = this.props.comment.text ? this.props.comment.text : '';
        return (
            React.createElement('li', {className:'SprayComment'},
                React.createElement('h3', null,
                    name
                ),
                React.createElement('p', null,
                    text
                )
            )
        )
    }
})
