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
                // var formatted = string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                var formatted = string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                console.log(string);
                console.log(formatted);

                var regex = new RegExp("(" + formatted + ")", "gm")
                // $(selection.focusNode.parentNode).html(function(_, html) {
                //     return html.replace(regex, '<span id="graffiti-spray" data-graffiti-target="' + string + '">$1</span>');
                // });

                $(selection.focusNode.parentNode).contents().filter(function() {
                    return this.nodeType === 3;
                }).each(function() {
                    $(this).replaceWith($(this).text().replace(regex, '<span id="graffiti-spray" data-graffiti-target="' + string + '">$1</span>'));
                });

                $('.commentForm').addClass('graffiti-visible');
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
