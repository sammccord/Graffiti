var Comment = React.createClass({
    displayName: 'Comment',
    render: function() {
        var name = this.props.comment.name ? this.props.comment.name : '';
        var text = this.props.comment.text ? this.props.comment.text : '';

        var date = new Date(this.props.comment.createdAt);


        return (
            React.createElement('li', {
                    className: 'SprayComment'
                },
                React.createElement('div', {
                        className: 'col-xs-2'
                    },
                    null),
                React.createElement('div', {
                        className: 'col-xs-10'
                    },
                    React.createElement('b', {className: 'commentAuthor'},
                        name+' '
                    ),
                    React.createElement('span', {
                            className: 'muted'
                        },
                        moment(date).from(new Date())
                    ),
                    React.createElement('p', null,
                        text
                    )
                )
            )
        )
    }
})
