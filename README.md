![](http://kary.us/GitHubWideImages/Arendelle/marker-js/Screen%20Shot%202015-02-15%20at%2012.43.52%20AM.png)<br>

# Marker.js

A JavaScript library for highlighting Arendelle. It's a port of [Cliff.Highlighter](https://github.com/arendelle/marker) and has an online website studio where you can write Arendelle codes and get an immediate result as native HTML / CSS.<br><br>

## Using it in your website
Use this in your header:

```HTML
<script src="http://web.arendelle.org/developer/marker.js"></script>
```

And then you can highlight code using the `mark(code)` function like:

```JavaScript
document.getElementById("something").innerHTML = mark ( document.getElementById("something").innerHTML )
```

Done!

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

