/**
 *		jQuery Font (by @visualidiot)
 *		Licensed under the WTFPL.
 *
 *		 Usage:		$(element).font()
 *		Return:		Font name, as a string, from the CSS stack, or undefined.
 */


$.fn.font = function() {

	var me = $(this),
	stack = (me.css('font-family') ? me.css('font-family').split(', ') : [undefined]),
		i = 0,
		current = '',
		body = $('body'),
		style = 'position: absolute; padding: 0; width: auto; font-size: 40px; left: -999em; top: -999em;',
		comicStack = body.append('<div id="comic-stack" style="' + style + ' font-family: \'Comic Sans MS\', \'Comic Sans\'">My word! This quail WAS DEVOUT? 107 Times.</div>').find('#comic-stack');
	
	if(stack[0] != 'Comic Sans MS') {
		for(i = 0; i <= stack.length; i++) {
			id = new Date().getTime();
			family = body.append('<div id="stack-' + id + '" style="' + style + ' font-family: ' + stack[i] + ', \'Comic Sans MS\', \'Comic Sans\'">The quick brown fox jumps over the lazy dog. MmWwMwWm</div>')
						 .find('#stack-' + id);
			width = family.css('width');
			
			family.remove();

			if(width != comicStack.width()) {
				current = stack[i];
				
				comicStack.remove();
				break;
			}
		}
		
		//	If there's no fonts installed, fall back to the last one in the stack.
		return (current != '' ? current : stack[stack.length]);
	} else {
		return stack[0]; // If they're using Comic Sans, just return that. It'll break our testbed otherwise.
	}
};