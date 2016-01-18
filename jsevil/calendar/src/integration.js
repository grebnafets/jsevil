/* global calendar_buildDisplayMonth, printf, sprintf */
/* global calendar_weekDayNumberToString, calendar_createDisplayObj */
/* global calendar_buildDisplayHead, calendar_parseTemplate, calendar_setup */

var okt2014 = calendar_buildDisplayMonth(calendar_createDisplayObj(9, 2014));
var nov2014 = calendar_buildDisplayMonth(calendar_createDisplayObj(10, 2014));
var des2014 = calendar_buildDisplayMonth(calendar_createDisplayObj(11, 2014));

var jan2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(0, 2015));
var feb2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(1, 2015));
var mar2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(2, 2015));
var apr2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(3, 2015));
var mai2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(4, 2015));
var jun2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(5, 2015));
var jul2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(6, 2015));
var aug2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(7, 2015));
var sep2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(8, 2015));
var okt2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(9, 2015));
var nov2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(10, 2015));
var des2015 = calendar_buildDisplayMonth(calendar_createDisplayObj(11, 2015));

var jan2016 = calendar_buildDisplayMonth(calendar_createDisplayObj(0, 2016));
var feb2016 = calendar_buildDisplayMonth(calendar_createDisplayObj(1, 2016));
var mar2016 = calendar_buildDisplayMonth(calendar_createDisplayObj(2, 2016));

printf("%s%s/%s\n\n", sprintf(okt2014.fmt, okt2014.arg), okt2014.m + 1, okt2014.y);
printf("%s%s/%s\n\n", sprintf(nov2014.fmt, nov2014.arg), nov2014.m + 1, nov2014.y);
printf("%s%s/%s\n\n", sprintf(des2014.fmt, des2014.arg), des2014.m + 1, des2014.y);

printf("%s%s/%s\n\n", sprintf(jan2015.fmt, jan2015.arg), jan2015.m + 1, jan2015.y);
printf("%s%s/%s\n\n", sprintf(feb2015.fmt, feb2015.arg), feb2015.m + 1, feb2015.y);
printf("%s%s/%s\n\n", sprintf(mar2015.fmt, mar2015.arg), mar2015.m + 1, mar2015.y);
printf("%s%s/%s\n\n", sprintf(apr2015.fmt, apr2015.arg), apr2015.m + 1, apr2015.y);
printf("%s%s/%s\n\n", sprintf(mai2015.fmt, mai2015.arg), mai2015.m + 1, mai2015.y);
printf("%s%s/%s\n\n", sprintf(jun2015.fmt, jun2015.arg), jun2015.m + 1, jun2015.y);
printf("%s%s/%s\n\n", sprintf(jul2015.fmt, jul2015.arg), jul2015.m + 1, jul2015.y);
printf("%s%s/%s\n\n", sprintf(aug2015.fmt, aug2015.arg), aug2015.m + 1, aug2015.y);
printf("%s%s/%s\n\n", sprintf(sep2015.fmt, sep2015.arg), sep2015.m + 1, sep2015.y);
printf("%s%s/%s\n\n", sprintf(okt2015.fmt, okt2015.arg), okt2015.m + 1, okt2015.y);
printf("%s%s/%s\n\n", sprintf(nov2015.fmt, nov2015.arg), nov2015.m + 1, nov2015.y);
printf("%s%s/%s\n\n", sprintf(des2015.fmt, des2015.arg), des2015.m + 1, des2015.y);

printf("%s%s/%s\n\n", sprintf(jan2016.fmt, jan2016.arg), jan2016.m + 1, jan2016.y);
printf("%s%s/%s\n\n", sprintf(feb2016.fmt, feb2016.arg), feb2016.m + 1, feb2016.y);
printf("%s%s/%s\n\n", sprintf(mar2016.fmt, mar2016.arg), mar2016.m + 1, mar2016.y);

var custom = {
	head: function(display) {
		"use strict";
		var r;
		display.fmt += "%c";
		display.arg.push(
			"color:blue;font-weight:bold"
		);
		display.fmt += " %d %d\n";
		display.arg.push(display.y);
		display.arg.push(display.m + 1);
		display.fmt += "%c";
		display.arg.push(
			"color:yellow"
		);
		for (r = 0; r < 7; r += 1) {
			display.fmt += " %s";
			display.arg.push(
				calendar_weekDayNumberToString(
					r, {alias:true}
				)
			);
		}
		display.fmt += "\n";
	},
	pre: function(display) {
		"use strict";
		if (display.d > 9) {
			display.fmt += "%c  %d";
		} else {
			display.fmt += "%c   %d";
		}
		display.arg.push("color:purple");
		display.arg.push(display.d);
	},
	post: function(display) {
		"use strict";
		if (display.d > 9) {
			display.fmt += "%c  %d";
		} else {
			display.fmt += "%c   %d";
		}
		display.arg.push("color:purple");
		display.arg.push(display.d);
	},
	days: function(display) {
		"use strict";
		/* Example of what is possible:
		 * var currentDay = new Date().getUTCDate();
		 * */
		var currentDay = 11;
		if (display.d > 9) {
			display.fmt += "%c  %d";
		} else {
			display.fmt += "%c   %d";
		}
		if (currentDay === display.d) {
			display.arg.push("color: red");
		} else {
			display.arg.push("color: white");
		}
		display.arg.push(display.d);
	}
};

var dispHead = calendar_createDisplayObj(11, 2015);
var disp = calendar_createDisplayObj(11, 2015);

var customDes2015Head = calendar_buildDisplayHead(
	dispHead, custom
);
var customDes2015 = calendar_buildDisplayMonth(
	disp, custom
);

printf("%s", sprintf(customDes2015Head.fmt, customDes2015Head.arg));
printf("%s%s/%s\n\n", sprintf(customDes2015.fmt, customDes2015.arg), customDes2015.m + 1, customDes2015.y);

var exampleTemplate = "base template for $NAME %m %y %m %y, $END";
var obj = {
	head: {
		templ: exampleTemplate,
		tokens: [
			{key:"$NAME", val: "head"},
			{key:"$END", val:"the end"}
		]
	}
};
var display;
display = calendar_createDisplayObj(0, 2016);
display = calendar_buildDisplayHead(display, calendar_setup(obj));

printf("%s", sprintf(display.fmt, display.arg));
