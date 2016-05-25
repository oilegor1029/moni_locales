jQuery(document).ready(function() {
	$('#metodoContacto input[type="checkbox"]').click(function(){
		var idInput = $(this).attr("value");
		var input = $('input[name="'+idInput+'"]');
		var estado = input.prop("readonly");
		input.val("");
		input.prop("readonly", !estado);
		if (estado) input.focus();
    });
});