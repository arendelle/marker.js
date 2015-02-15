![](http://kary.us/GitHubWideImages/Arendelle/marker-js/Screen%20Shot%202015-02-15%20at%2012.43.52%20AM.png)<br>

# Marker.js

A pure super-lightweight framework-independent JavaScript library for highlighting Arendelle. It's a port of [Cliff.Highlighter](https://github.com/arendelle/marker) and has an online website studio where you can write Arendelle codes and get an immediate result as native HTML / CSS.<br><br>

## Using it in your website
Use this in your header:

```HTML
<script src="http://web.arendelle.org/developer/marker.js"></script>
```

We ask you to use `marker.js` from our website because this way we can keep the file update all over the web as well as delivering you a minified `2.5 KB` file. And then add this line (Which is awesome if you put it in the end of your website)

```HTML
<script type="text/javascript">markerInitHighlightingOnLoad()</script>
```

And then what ever you want to highlight use class `arendelle` for and they will be simply highlighted:

```HTML
<pre><code class="arendelle">[ 10 , pr ]</code></pre>
```

This system is designed to be very much like [highlight.js](https://highlightjs.org) 

<br><br>

## A bit Pro

If you want to highlight yourself you can use `highlight( code )` function. You can use this codes like this:

```JavaScript
document.getElementById( "something" ).innerHTML = highlight ( document.getElementById("something").innerHTML )
```

Done! You've mastered it all!

<br><br>

## License

```
Marker.js - Library for highlighting Arendelle Code
Copyright (c) 2015 Pouya Kary <k@arendelle.org>


This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

