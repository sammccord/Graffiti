var SprayList = React.createClass({
	displayName: 'SprayList',
	render: function(){
		var Sprays = this.props.sprays.map(function(sprayData){
			return React.createElement(Spray, {spray:sprayData})
		});
		return (
				React.createElement('ul',
					{className:'SprayList'},
						Sprays
					)
			)
	}
})