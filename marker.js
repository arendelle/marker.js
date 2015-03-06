
// Repo at [GitHub](https://github.com/arendelle/marker.js) |
// Online Playground at [Arendelle Developer](http://web.arendelle.org/developer/marker-studio/)
//
// &copy; Copyright 2015 Pouya Kary. <k@arendelle.org>
//
// A fast marker to highlight Arendelle codes on the web. 
// It's designed to work just like [highlight.js](https://highlightjs.org) all you
// have to do to get it to work is to simply add this lines to your website:
//
// ```
// <script src="http://web.arendelle.org/developer/marker.js"></script>
// <script type="text/javascript">markerInitHighlightingOnLoad()</script>
// ```
// 
// And then simply add class `arendelle` to your codes:
//
// ```
// <pre class="arendelle">[ 10 , pr ]</pre>
// ```

var marker_version = '1.12';

//<br><br>
//## marker Init Highlighting On Load

// This function highlights all the tags classified as `arendelle` like the `initHighlightingOnLoad` of highlight.js
function markerInitHighlightingOnLoad () {

	var elements = document.getElementsByClassName('arendelle');

	for ( var i = 0; i < elements.length; i++ ) {

		elements[i].innerHTML = markerHighlight(elements[i].innerHTML);

	}
}

//## marker Highlight

// This is where the magic happens. You pass it a code like `[ 10 , pr ]` and it generates you highlighted code for that<br><br><br>

function markerHighlight (text) {

	// ###First Info Init

	// Theme colors

	var grammar_color		= "D60073";
	var comment_color 		= "A0A0A0";
	var func_comment_color		= "8C007F";
	var data_color			= "4E00FC";
	var string_color		= "BD00AD";
	var number_color		= "6200A8";


	// Parts of span tag so we can do : `start + COLOR + middle + CODE + end`

	var start   = '<span style="color: #';
	var middle  = ';">';
	var end     = '</span>';


	// Where we keep the final result

	var result = '';

	// Because we can't use < and > in HTML, We have to write an
	// Arendelle code like `[ @x < 10 , pr ]` this way: `[ @x &lt; 10 , pr ]`
	// Now this is pure JavaScript not HTML! So we can transform the special
	// characters back to Arendelle way.

	text = text.replace('&lt;','<').replace('&gt;','>');


	// ### Body

	// Here we read the code char by char and initialize highlighting if necessary. 
	// Also we keep the current char in the `reading_char` 

	for ( var i = 0; i < text.length; i++ ) {

		var reading_char = text[i];

		switch (reading_char) {

			// ### Grammars

			// Grammars in Arendelle things starting with something, divided by a ','
			// and then ending with something else like: `( part1, part2, part3 )` All
			// we have to do here is to highlight their grammar parts: `(`, `,` , `)`

			case '[':
			case ']':
			case ')':
			case '{':
			case '}':
			case ';':

				result += start + grammar_color + middle + reading_char + end;
				break;

			// ### Special Characters

			// Now it's time to change back the special characters we converted from
			// HTML to Arendelle back to HTML but in pretty highlighted way!

			case '<':
				result += start + grammar_color + middle + "&lt;" + end;
				break;

			case '>':
				result += start + grammar_color + middle + "&gt;" + end;
				break;




			// #### Situation here!

			// Our system will identify all data using their signs such as `@`, `#`, `$`... 
			// But there is one special situation where we init spaces: `( space name , data )`
			// in this special case we need to highlight `space name` as data. In order to do this
			// we first have to take care that the it's a space initializer not a function or something's
			// parentheses. so we have to highlight space in `( space , 10)` but not in `!func(space)`.<br><br>
			// There is also this other thing here that that is function comments like: `!func(comment:something)`.
			// They also start with `(` and sometimes `,` and then finish with an `:` instead of `)` or `,` So we
			// have to take care of them too. Good news is we can use one simple path to have them both.<br><br>

			case '(':
			case ',':


				// We first begin with storing the starting char:
				// <br><span style="font-family:monospace; background-color:#FFFF00;">(</span><span style="font-family:monospace;"> space , something )</span><br>
				// So then we can read the `space_init_string`:
				// <br><span style="font-family:monospace;">( <span style="font-family:monospace; background-color:#FFFF00;">space</span> , something )</span><br>

				result += start + grammar_color + middle + reading_char + end;


				// We use `space_init_string` to store the special part we want to highlight

				var space_init_string = '';
				var while_control_6   = true;
				
				// Going to the next char

				i++;

				// Now. We see what characters are in `/[\.a-z0-9 ]/i` which means all numbers,
				// dots. and basic Latin characters: The standard space name format we're looking
				// for. As soon as the character we're reading be not a member this regex we're sure
				// that we've found our `space_init_string`: 

				while ( i < text.length && while_control_6 ) {

					if ( /[\.a-z0-9 ]/i.test( text[ i ] ) ) {

						space_init_string += text[ i ];

					} else {

						while_control_6 = false;
						i--;

					}

					i++;
				}

				// So first thing we have to do here is to check if our text is standard space init / funciton
				// comment or not. Then we can identify them

				if ( /^ *[a-z][\.a-z0-9 ]*$/i.test(space_init_string) ) {

					// So if the text ended with `:` we can be sure that it was a function comment and then
					// we can simply highlight it.

					if ( text[i] == ':' ) {

						result += start + func_comment_color + middle + space_init_string + ':' + end;
						i++;

					// Else way we have to see if it was a space init. All we have to do is to
					// check if the `reading_char` was `(` and also the ending chars were `,` and `)`

					} else if ( reading_char == "(" && text[i] == ',' || reading_char == "(" && text[i] == ')') {

						result += start + data_color + middle + space_init_string + end;

					// Else way we had it all wrong so will treat the `space_init_string` as normal text
					// and we send it to a normal highlight

					} else {

						result += markerHighlight (space_init_string);

					}

				} else {

					result += markerHighlight (space_init_string);

				}
				
				i--;
				break;




			// ### NUMERICS

			// We take care of numbers here. Simply like what we did before 

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

				var number_string   = '';
				var while_control_1 = true;

				number_string += reading_char; i++;

				while ( i < text.length && while_control_1 ) {

					if ( /[0-9\.]/.test( text[ i ] ) ) {

						number_string += text[ i ];

					} else {

						while_control_1 = false;
						i--;
						break;

					}

					i++;
				}

				result += start + number_color + middle + number_string + end;
				break;




			// ### Data Formats

			// **Spaces**, **Sources**, **Functions** and **Stored Spaces** are being identified here:

			case '@':
			case '#':
			case '!':
			case '$':

				var data_string      = '';
				var while_control_2  = true;

				data_string += reading_char; i++;
				
				while ( i < text.length && while_control_2 ) {

					if ( /[a-z0-9\?\. ]/i.test( text[ i ] ) ) {

						data_string += text[ i ];

					} else {

						while_control_2 = false;
						i--;
						break;

					}

					i++;
				}

				result += start + data_color + middle + data_string + end; 

				break;




			// ### Comments

			// Arendelle supports 3 commenting system: **Slash-Star**, **Slash-Slash**, **Function-Comment**.
			// We took care of Function-Comments in the "[Special Situation](#section-16)" that's why our job
			// is easier here. We only have to take care about C style comments: `/* comment */` and `// comment`
			// <br><br>Now the thing that makes it too easy is they both start with `/` and thanks to that we don't
			// need to change any architecture, char-by-char still works

			case '/':

				var comment_string = '';
				
				if ( i < text.length - 1 ) {

					i++;

					// So we now know that we have our first `/`, Next thing we should do is to determine
					// what the next char is, If it was `/` we know it's **slash-slash**, if it was `*` we
					// know we're looking for a **slash-star** and if none of those it was a normal divide
					// operator so we leave the way it was.

					// **Slash-Slash**

					if ( text[ i ] === '/' ) {

						comment_string = '//'; i++;

						while ( i < text.length && text[ i ] !== '\n' ) {

							comment_string += text[ i ];
							i++;

						}

						result += start + comment_color + middle + comment_string + end;
						i--;

					// **slash-start**

					} else if ( text[ i ] === '*' ) {

						i++; comment_string  = '/*'; 
						var  while_control_5 = true;

						while ( i < text.length && while_control_5 ) {

							// **slash-start** ends with `*/`. Because of the nature of our char-by-char
							// system we have to still read char by char and when we reached Astrix find what's
							// the next character of it, If it was `/` we're done else way we still have to
							// continue reading. 

							if ( text[ i ] === '*' && i < text.length -1 ) {

								i++;
								if ( text[ i ] === '/' ) {

									comment_string += '*/';
									while_control_5 = false;

								} else {
									comment_string += '*' + text[i];
									i++;
								}						

							} else {
								comment_string += text[ i ];
								i++;
							}
						}

						result += start + comment_color + middle + comment_string + end;

					// Okay it was just a simple diver

					} else {
						result += '/' + text[ i ];
					}

				} else {
					result += '/';
				}

				break;




			// ### Strings

			// Strings are very important parts to execute because they not only have scape 
			// sequences ( `\'`, `\n`... ) they also have string interpolations `\( ... )` the
			// value inside the interpolation must be again highlighted in a recursive way using
			// the highlight. We use `string_sign` to know how are string is started, with a `'`
			// or a `"` so we can find out are we in the end of our string or not. We are also
			// going to store all string into `string_string` (Bas name I'm aware!)

			case "'":
			case '"':

				var string_string   = '';
				var string_sign     = reading_char;
				var while_control_3 = true; 

				i++;

				// So like before we read the string in a while and we get out using our `while_control_3`

				while ( i < text.length && while_control_3 ) {

					switch ( text[ i ] ) {

						// First thing we check is that are we in the end of our string and if we were
						// we wrap the whole string in a nice span as always.

						case string_sign :
							result += start + string_color + middle + string_sign + string_string + string_sign + end;
							while_control_3 = false; i--;
							break;

						// Other thing is to take care of scape sequences. Because Arendelle uses 
						// [Swift like String Interpolation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html)
						// the interpolation starts with a back slash as well therefore we can take care of all here.

						case '\\':
							i++;

							switch (text[ i ]) {

								// Is it interpolation? if it is we have to do this: We read it then we highlight inside
								// of it using a recursive use of the `markerHighlight` function itself like what we did before.

								case '(':

									var while_control_4        = true;
									var string_replacer_string = '';
									var indent_level		   = 0;

									
									while ( i < text.length && while_control_4 ) {

										i++;

										if ( text[ i ] === '(' ) {

											indent_level++;

										} else if ( text[ i ] === ')' ) {

											if ( indent_level === 0 ) {

												while_control_4 = false; i++;
												string_string += end + "\\(" + markerHighlight ( string_replacer_string ) + ")" + start + string_color + middle;

											}

											indent_level--;

										} else {

											string_replacer_string += text[ i ];

										}
									}

									break;

								// Or if it's not a string interpolation it's a **Scape Sequence**, All we
								// have to do is to highlight it.

								default:
									string_string += start + data_color + middle + '\\' + text[ i ] + end;
									i++;

							}

							i--;
							break;

						// So if it's not the end of the string, also not a scape 
						// sequence or string interpolation then what is it? Yes! It's
						// a plain text! so we add it to the rest of the `string_string`

						default:
							string_string += text[ i ];
					}

					i++;
				}

				break;



			// ### White Spaces

			// Okay the final thing we check is if the codes are white spaces. Because HTML never
			// understands new lines, spaces and tabs we will talk HTML so that the what a new line
			// or a tap is

			case '\n':
				result += "<br>";
				break;

			case ' ':
				result += "&nbsp;";
				break;

			case '\t':
				result += "&nbsp;&nbsp;&nbsp;";
				break;


			// ### Nothing!

			// Yes if non of our cases are true, what we're reading is not a function
			// or a comment or a data type and so. The char is maybe a command, math operator
			// standard library function or what ever! So we just add it as what it is.

			default:
				result += reading_char;
		}

	}

	// ### Done!

	// We're all set, It's time to return what's about to return~

	return result ;
}


// <br><br><hr>
// ## License
//
// Marker.js - Library for highlighting Arendelle Code<br>
// Copyright (c) 2015 Pouya Kary <k@arendelle.org><br><br>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.<br><br>
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.<br><br>
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
// <hr><br><br><br>
