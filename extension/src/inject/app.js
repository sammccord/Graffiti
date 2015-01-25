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
var _watch = [];
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
        componentDidMount: function() {
            //SET UP APP HOOKS
            modules.on('Page:GET', function(response) {
            		console.log('FIRING PAGE GET', response);
                if (response.err) console.log(response.err);
                else {
                    this.setState(response.data);
                }
            }.bind(this))

            modules.on('Spray:CREATE', function(response) {
                if (response.err) console.log(response.err);
                else {
                    modules.send({
                        action: 'Page:GET',
                        method: 'GET',
                        args: {
                            id: page_data._id
                        }
                    })
                }
            }.bind(this))

            modules.on('Comment:CREATE', function(response) {
                if (response.err) console.log(response.err);
                else {
                    modules.send({
                        action: 'Page:GET',
                        method: 'GET',
                        args: {
                            id: page_data._id
                        }
                    })
                }
            }.bind(this))
        },
        targetSpray: '',
        handleCommentSubmit: function(sprayComment) {
            if ($('#graffiti-spray').length > 0) {
                var targetText = document.getElementById('graffiti-spray').getAttribute('data-graffiti-target');
                console.log(targetText);
                $('#graffiti-spray').contents().unwrap();
                modules.send({
                    action: 'Spray:CREATE',
                    method: 'POST',
                    args: {
                        name: sprayComment.author,
                        text: sprayComment.text,
                        page: current_page,
                        targetText: targetText
                    }
                })
            } else if (this.targetSpray) {
                console.log(sprayComment);
                var sprayId = this.targetSpray;
                modules.send({
                    action: 'Comment:CREATE',
                    method: 'POST',
                    args: {
                        id: sprayId,
                        name: sprayComment.author,
                        text: sprayComment.text,
                    }
                })
            }
        },
        presentSprays: [],
        addSprayHighlight: function() {
            $('.graffiti-spray,.graffiti-count').addClass('graffiti-highlight')
        },
        removeSprayHighlight: function() {
            $('.graffiti-spray,.graffiti-count').removeClass('graffiti-highlight')
        },
        render: function() {
            var state = this;
            console.log('app rendering');
            this.state.sprays.forEach(function(spray) {
                if (this.presentSprays.lastIndexOf(spray._id) === -1) {
                    this.presentSprays.push(spray._id);
                    if (spray.targetText) {
                        var formatted = spray.targetText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                        var regex = new RegExp("(" + formatted + ")", "g")
                        $.each($('p:not(#graffiti-app *)'), function(index, el) {
                            $(el).html(function(_, html) {
                                return html.replace(regex, '<span class="graffiti-spray" data-graffiti-id="' + spray._id + '">$1</span><span graffiti-count-id="' + spray._id + '" class="graffiti-count">' + spray.comments.length + '</span>');
                            });
                        })

                        $.each($('.graffiti-count'), function(index, el) {
                            var offset = ($(el).parent().width() + $(el).parent().offset().left);
                            $(el).css({
                                '-webkit-transform': 'translateX(' + offset + 'px)'
                            })
                        })

                        $('[data-graffiti-id]').on('mouseenter', function() {
                            var targetId = this.getAttribute('data-graffiti-id');
                            $('.SprayList').animate({
                                scrollTop: $(".Spray.Spray-" + targetId + "").offset().top
                            }, 500);
                        }).on('click', function() {
                            var selectedGraffiti = $(this).attr('data-graffiti-id');
                            state.targetSpray = selectedGraffiti;
                            // $('ul.SprayList li.Spray:not(.Spray-' + selectedGraffiti + ')').removeClass('graffiti-visible');
                            $('#graffiti-spray').contents().unwrap();
                            $('.commentForm').addClass('graffiti-visible');
                        })

                        $('.graffiti-scroller').html('0');
                        $('[graffiti-count-id]')
                            .scrolledIntoView()
                            .on('scrolledin', function() {
                                $('.graffiti-scroller').html(function(_, html) {
                                    return parseInt(html) + parseInt($(this).text());
                                }.bind(this));
                            })
                            .on('scrolledout', function() {
                                $('.graffiti-scroller').html(function(_, html) {
                                    return parseInt(html) - parseInt($(this).text());
                                }.bind(this));
                            });
                        $(window).scrollTop($(window).scrollTop() + 1);
                    }
                }
            }.bind(this))

            return (
                React.createElement("div", {
                        className: 'graffiti-container'
                    },
                    React.createElement("div", {
                        className: 'graffiti-scroller',
                        onMouseEnter: this.addSprayHighlight,
                        onMouseLeave: this.removeSprayHighlight
                    }, '0'),
                    React.createElement(CommentForm, {
                        onCommentSubmit: this.handleCommentSubmit
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
