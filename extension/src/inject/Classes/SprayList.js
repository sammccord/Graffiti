var SprayList = React.createClass({
	displayName: 'SprayList',
	render: function(){
		var Sprays = this.props.sprays.map(function(sprayData){
			return React.createElement(Spray, {
				key:sprayData._id,
				spray:sprayData
			})
		});
		return (
				React.createElement('ul',
					{className:'SprayList'},
						Sprays
					)
			)
	}
})