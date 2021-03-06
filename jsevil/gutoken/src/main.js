/* GroundUpToken */

function GUToken(DefaultData)
{
	"use strict";
	this.def = DefaultData;
	this.data = [];
	this.info = {
		total: 0,
		defined: 0
	};
}

function gutoken_put(gutoken, name, data)
{
	"use strict";
	var i, len, buf;
	len = name.length - 1;
	buf = "";
	for (i = 0; i < len; i += 1) {
		buf  += name[i];
		if (gutoken.data[buf] === undefined) {
			gutoken.data[buf] = new gutoken.def();
			gutoken.info.total++;
		}
	}
	if (gutoken.data[name] === undefined) {
		gutoken.info.total++;
		gutoken.info.defined++;
	}
	gutoken.data[name] = new gutoken.def(data);
	
}

function gutoken_exists(gutoken, name)
{
	"use strict";
	var out;
	out = false;
	if (gutoken.data[name] !== undefined) {
		out = true;
	}
	return out;
}


/* ===========jshint hack===========*/
if (false) {
	GUToken();
	gutoken_put();
	gutoken_exists();
}
