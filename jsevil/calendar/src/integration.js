/* global calendar_buildDisplayMonth, calendar_state, printf, sprintf */
/* global calendar_weekDayNumberToString */

var okt2014 = calendar_buildDisplayMonth(calendar_state, 9, 2014);
var nov2014 = calendar_buildDisplayMonth(calendar_state, 10, 2014);
var des2014 = calendar_buildDisplayMonth(calendar_state, 11, 2014);

var jan2015 = calendar_buildDisplayMonth(calendar_state, 0, 2015);
var feb2015 = calendar_buildDisplayMonth(calendar_state, 1, 2015);
var mar2015 = calendar_buildDisplayMonth(calendar_state, 2, 2015);
var apr2015 = calendar_buildDisplayMonth(calendar_state, 3, 2015);
var mai2015 = calendar_buildDisplayMonth(calendar_state, 4, 2015);
var jun2015 = calendar_buildDisplayMonth(calendar_state, 5, 2015);
var jul2015 = calendar_buildDisplayMonth(calendar_state, 6, 2015);
var aug2015 = calendar_buildDisplayMonth(calendar_state, 7, 2015);
var sep2015 = calendar_buildDisplayMonth(calendar_state, 8, 2015);
var okt2015 = calendar_buildDisplayMonth(calendar_state, 9, 2015);
var nov2015 = calendar_buildDisplayMonth(calendar_state, 10, 2015);
var des2015 = calendar_buildDisplayMonth(calendar_state, 11, 2015);

var jan2016 = calendar_buildDisplayMonth(calendar_state, 0, 2016);
var feb2016 = calendar_buildDisplayMonth(calendar_state, 1, 2016);
var mar2016 = calendar_buildDisplayMonth(calendar_state, 2, 2016);

printf("%s", sprintf(okt2014.fmt, okt2014.arg));
printf("%s", sprintf(nov2014.fmt, nov2014.arg));
printf("%s", sprintf(des2014.fmt, des2014.arg));

printf("%s", sprintf(jan2015.fmt, jan2015.arg));
printf("%s", sprintf(feb2015.fmt, feb2015.arg));
printf("%s", sprintf(mar2015.fmt, mar2015.arg));
printf("%s", sprintf(apr2015.fmt, apr2015.arg));
printf("%s", sprintf(mai2015.fmt, mai2015.arg));
printf("%s", sprintf(jun2015.fmt, jun2015.arg));
printf("%s", sprintf(jul2015.fmt, jul2015.arg));
printf("%s", sprintf(aug2015.fmt, aug2015.arg));
printf("%s", sprintf(sep2015.fmt, sep2015.arg));
printf("%s", sprintf(okt2015.fmt, okt2015.arg));
printf("%s", sprintf(nov2015.fmt, nov2015.arg));
printf("%s", sprintf(des2015.fmt, des2015.arg));

printf("%s", sprintf(jan2016.fmt, jan2016.arg));
printf("%s", sprintf(feb2016.fmt, feb2016.arg));
printf("%s", sprintf(mar2016.fmt, mar2016.arg));

var custom = {
	head: {
		terminal: function(display) {
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
		}
	},
	pre: {
		terminal: function(display) {
			"use strict";
			if (display.d > 9) {
				display.fmt += "%c  %d";
			} else {
				display.fmt += "%c   %d";
			}
			display.arg.push("color:purple");
			display.arg.push(display.d);
		}
	},
	post: {
		terminal: function(display) {
			"use strict";
			if (display.d > 9) {
				display.fmt += "%c  %d";
			} else {
				display.fmt += "%c   %d";
			}
			display.arg.push("color:purple");
			display.arg.push(display.d);
		}
	},
	days: {
		terminal: function(display) {
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
	}
};

var customDes2015 = calendar_buildDisplayMonth(
	calendar_state, 11, 2015, custom
);

printf("%s", sprintf(customDes2015.fmt, customDes2015.arg));
