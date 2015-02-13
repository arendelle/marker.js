
//
// Marker.js, Port of the original Cliff.Marker
// Copyright 2015 Pouya Kary <k@arendelle.org> 
//


//
// TAGS
//

var start        = '<span style="color: #';
var middle       = ';">';
var end          = '</span>';
var start_header = '<!-- Marker.js : Start --><pre><code>';
var end_header   = '</code></pre><!-- Marker.js : End -->';


//
// COLORS
//

var loop_color     = "D60073";
var data_color     = "4E00FC";
var comment_color  = "A0A0A0";
var string_color   = "BD00AD"; 
var number_color   = "6200A8";
var function_color = "8C007F";



// Highlight
function highlight (text) {

	var result   = '';

	for ( var i = 0; i < text.length; i++ ) {

		var reading_char = text[i];

		switch (reading_char) {

			case '[':
			case ']':
			case '(':
			case ')':
			case '<':
			case '>':
			case '{':
			case '}':
			case ',':

				result += start + loop_color + middle + reading_char + end;
				break;

			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '.':

				result += start + number_color + middle + reading_char + end;
				break;

			default:
				result += reading_char;
		}

	}

	return start_header + result + end_header;
}

//
// DONE
//









