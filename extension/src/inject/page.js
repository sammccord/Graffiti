(function() {
    $('p:not(#graffiti-app *)').addClass('graffiti-selectable');

    $('.graffiti-selectable').on('selectstart', function() {
        $('.createSpray').removeClass('graffiti-visible');
        $('#graffiti-spray').contents().unwrap();
        $(document).one('mouseup', function(e) {
            var selection = window.getSelection();
            if (selection.type === "Range") {
                console.log(selection);

                var string = selection.toString();
                var formatted = string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

                var regex = new RegExp("(" + formatted + ")", "g")
                $(selection.focusNode.parentNode).html(function(_, html) {
                    return html.replace(regex, '<span id="graffiti-spray" data-graffiti-target="' + string + '">$1</span>');
                });

                $('.createSpray').addClass('graffiti-visible');
            }
        });
    });

    //   //Alternate for by sentence.
    //   $("p").html(function(_, html) {
    //   var rebuilt = "";
    //     html.split(/[.!?][\s]{1,100}(?=[A-Z])/g).forEach(function (sentence){
    //         rebuilt += '<span class="graffiti-">'+sentence+'.</span>';
    //     });
    //     return rebuilt;
    // });

})();
