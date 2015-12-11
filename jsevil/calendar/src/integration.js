/* global calendar_buildDisplayMonth, calendar_state, printf */
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

printf("%s", okt2014);
printf("%s", nov2014);
printf("%s", des2014);

printf("%s", jan2015);
printf("%s", feb2015);
printf("%s", mar2015);
printf("%s", apr2015);
printf("%s", mai2015);
printf("%s", jun2015);
printf("%s", jul2015);
printf("%s", aug2015);
printf("%s", sep2015);
printf("%s", okt2015);
printf("%s", nov2015);
printf("%s", des2015);

printf("%s", jan2016);
printf("%s", feb2016);
printf("%s", mar2016);

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

printf("%s", customDes2015);
