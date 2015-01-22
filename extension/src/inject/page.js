(function() {
    $('body').prepend('<div id="graffiti-context-add"></div>');

		var adder = document.getElementById('graffiti-context-add');
    $('p:not(#graffiti-app *)').addClass('graffiti-selectable');

    $('.graffiti-selectable').on('selectstart', function() {
    		adder.classList.remove('graffiti-visible');
        $(document).one('mouseup', function(e) {
        		console.log(e);
	        	console.log(window.getSelection().toString());
        		adder.classList.add('graffiti-visible');
        		adder.style.webkitTransform = "translate("+e.screenX+"px, "+(e.screenY-100)+"px)";
        });
    });

})();
