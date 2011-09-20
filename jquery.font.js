/**
 *		jQuery Font (by @visualidiot)
 *		Licensed under the WTFPL.
 *
 *		 Usage:		$(element).font()
 *		Return:		Font name, as a string, from the CSS stack, or undefined.
 */


$.fn.font = function() {

	var stack = ($(this).css('font-family') ? $(this).css('font-family').split(', ') : [undefined]), //  Get the list of font families, or an empty array.
		current = '', //  Set a pointer to report the current font. Since we don't know what it is, let's make it empty.
		body = $('body'), //  Store the jQuery body object, since we'll use it more than once.
		style = 'position: absolute; padding: 0; width: auto; font-size: 40px; left: -999em; top: -999em;', //  Same thing for the style stack. Easier to change.
		text = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789 ,./;][=-~`', //  Get as many characters tested as possible.
		comicStack = body.append('<div id="comic-stack" style="' + style + ' font-family: \'Comic Sans MS\', \'Comic Sans\'">' + text + '</div>').find('#comic-stack'); // Standardised the text string to compare, reliability enhancements.
	
	if(stack[0] != 'Comic Sans MS') {
		for(i = 0; i <= stack.length; i++) {
			id = new Date().getTime();
			family = body.append('<div id="stack-' + id + '" style="' + style + ' font-family: ' + stack[i] + ', \'Comic Sans MS\', \'Comic Sans\'">' + text + '</div>')
						 .find('#stack-' + id);
			width = family.css('width');
			
			family.remove();

			//	If we have a match
			if(width != comicStack.width()) {
				//	Set it as the current font to report
				current = stack[i];
				
				//	Hide the original testbed
				comicStack.remove();
				
				//	Stop going through the other fonts
				break;
			}
		}
		
		//	If there's no fonts installed, fall back to the last one in the stack.
		return (current != '' ? current : stack[stack.length]);
	} else {
		return stack[0]; // If they're using Comic Sans, just return that. It'll break our testbed otherwise.
	}
};