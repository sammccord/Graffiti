$(document).ready(function(){
	$('p:not(#graffiti-app *)').addClass('graffiti-selectable');

	$('.graffiti-selectable').on('selectstart', function () {
        $(document).one('mouseup', function() {
            alert(this.getSelection());
        });
    });
});