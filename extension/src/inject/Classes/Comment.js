var Comment = React.createClass({
	displayName: 'Comment',
	render: function(){
		// var name = this.props.comment.user.name ? this.props.comment.user.name : '';
		console.log(this.props);
		var text = this.props.comment.text ? this.props.comment.text : '';
		return (
				// React.createElement('h3',null,
				// 	name
				// 	),
				React.createElement('p',null,
					text
					)
			)
	}
})