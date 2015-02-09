var SprayList = React.createClass({
    displayName: 'SprayList',
    componentWillReceiveProps:function(nextProps){
    	console.log(nextProps);
    	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    },
    render: function() {
        var Sprays = this.props.sprays.map(function(sprayData) {
            return React.createElement(Spray, {
                key: sprayData._id,
                spray: sprayData
            })
        });
        return (
            React.createElement('div', {
                    className: 'SprayList container'
                },
                Sprays
            )
        )
    }
})
