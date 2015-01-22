var SprayList = React.createClass({
	displayName: 'SprayList',
	componentDidMount: function(){
		// modules.send({
		// 	action:
		// })
	},
	render: function(){
		var Sprays = this.props.sprays.map(function(sprayData){
			return React.createElement(Spray, {spray:sprayData})
		});
		return (
				React.createElement('ul',null,
						Sprays
					)
			)
	}
})