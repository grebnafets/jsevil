/* global YELLOW, RED, GREEN, BLUE, BLACK, WHITE, PURPLE, MAGNETA, FOREGROUND */
/* global BACKGROUND, ESCAPE_PREFIX, RESET */
/* jshint unused: false */

/* helper functions {{{ */
function printfps_warnUnsupported(val)
{
	"use strict";
	var red, end, err, prefix;
	prefix = ESCAPE_PREFIX;
	red = prefix + FOREGROUND + RED + "m";
	end = prefix + RESET;
	err = red + val + " is unsupported, sorry." + end;
	print(err);
}

function printfps_color(col)
{
	"use strict";
	var res, prefix;
        res = "";
	prefix = ESCAPE_PREFIX;
	switch (col.toLowerCase()) {
	case "yellow":
		res = prefix + FOREGROUND + YELLOW + "m";
		break;
	case "red":
		res = prefix + FOREGROUND + RED + "m";
		break;
	case "green":
		res = prefix + FOREGROUND + GREEN + "m";
		break;
	case "blue":
		res = prefix + FOREGROUND + BLUE + "m";
		break;
	case "black":
		res = prefix + FOREGROUND + BLACK + "m";
		break;
	case "white":
		res = prefix + FOREGROUND + WHITE + "m";
		break;
	case "purple":
		res = prefix + FOREGROUND + PURPLE + "m";
		break;
	case "magneta":
		res = prefix + FOREGROUND + MAGNETA + "m";
		break;
	default:
		printfps_warnUnsupported(col);
		break;
	}
	return res;
}

function printfps_background_color(col)
{
	"use strict";
	var prefix, res;
        res = "";
	prefix = ESCAPE_PREFIX;
	switch (col.toLowerCase()) {
	case "yellow":
		res = prefix + BACKGROUND + YELLOW + "m";
		break;
	case "red":
		res = prefix + BACKGROUND + RED + "m";
		break;
	case "green":
		res = prefix + BACKGROUND + GREEN + "m";
		break;
	case "blue":
		res = prefix + BACKGROUND + BLUE + "m";
		break;
	case "black":
		res = prefix + BACKGROUND + BLACK + "m";
		break;
	case "white":
		res = prefix + BACKGROUND + WHITE + "m";
		break;
	case "purple":
		res = prefix + BACKGROUND + PURPLE + "m";
		break;
	case "magneta":
		res = prefix + BACKGROUND + MAGNETA + "m";
		break;
	default:
		printfps_warnUnsupported(col);
		break;
	}
	return res;
}

function printfps_font_weight(val)
{
	"use strict";
	var res, prefix;
        res = "";
	prefix = ESCAPE_PREFIX;
	if (val === "bold") {
		res = prefix + "1m";
	}
	return res;
}
/* }}} */

function printf_parseStyle(style)
{
	"use strict";
	var i, j, prefix, tuble, tubles, res;
	prefix = ESCAPE_PREFIX;
	j = 0;
	res = [];
	tubles = style.split(';');
	for (i = 0; i <  tubles.length; i += 1) {
		tuble = tubles[i].split(':');
		switch(tuble[0].trim().toLowerCase()) {
		case "color":
			res[j++] = printfps_color(tuble[1].trim());
			break;
		case "font-weight":
			res[j++] = printfps_font_weight(tuble[1].trim());
			break;
		case "background-color":
			res[j++] = printfps_background_color(tuble[1].trim());
			break;
		default:
			break;
		}
	}
	return res.join('');	
}

