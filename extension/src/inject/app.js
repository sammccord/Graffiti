//modules.send({
// action:"Domain","User"
// method:"GET,POST,PUT,DELETE"
// args: {domain:domain}
//})

//modules.on('action',function(response){
//response.err and response.data
//})

//User data
var user = {};
//Domain data
var domain = {};
var token = '';
var current_page;
var page_data = {};
var container;

modules.on('init', init)

function init() {

    chrome.storage.sync.get("token", function(data) {
        token = data.token;
        console.log(token);
    });

    //Prevent multiple inits per domain.
    if (document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+') === current_page) return false;
    current_page = document.domain.replace(/\./g, '+') + window.location.pathname.replace(/\//g, '+');
    console.log(current_page)

    $('body').prepend('<div id="graffiti-app"></div>');

    var GraffitiContainer = React.createClass({
        displayName: "GraffitiContainer",
        getInitialState: function() {
            return page_data;
        },
        initialize: function() {
            modules.on('Page:GET', function(response) {
                if (response.err) console.log(response.err);
                else {
                    console.log(response.data);
                    this.setState(response.data);
                }
            }.bind(this))
        },
        componentDidMount: function() {
            this.initialize();
        },
        handleSpraySubmit: function(sprayComment) {
            modules.send({
                action: 'Spray:CREATE',
                method: 'POST',
                args: {
                    page: current_page,
                    target: {
                        text: window.getSelection().toString()
                    }
                }
            })
        },
        render: function() {
            return (
                React.createElement("div", {
                        className: 'graffiti-container'
                    },
                    React.createElement(CreateSpray, {
                        onSpraySubmit: this.handleSpraySubmit
                    }),
                    React.createElement(SprayList, {
                        sprays: this.state.sprays
                    }, null)
                )
            )
        }
    })

    modules.on('Page:INIT', function(response) {
        if (response.err) console.log(response.err);
        else {
            console.log(response.data);
            page_data = response.data ? response.data : {};
            React.render(
                React.createElement(GraffitiContainer),
                document.getElementById('graffiti-app')
            );
        }
    })

    modules.send({
        action: 'Page:INIT',
        method: 'GET',
        args: {
            page: current_page
        }
    })

}
