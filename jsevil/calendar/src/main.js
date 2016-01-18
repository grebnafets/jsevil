/* exported calendar_isLeapYear, calendar_getYearDaysCount, calendar_abstractWeekDayNumber */
/* exported calendar_weekDayNumberToString, calendar_abstractWeekDayNumberCE, calendar_abstractWeekDayNumberBCE, calendar_buildDisplayMonth */
/* exported calendar_createDisplayObj, calendar_buildDisplayHead, calendar_parseTemplate */
/* exported calendar_countTokens, calendar_setup */
/* jshint laxbreak:true */

/* Author: github.com/grebnafets (Please do not remove this line.) */

/* Algorithms {{{ */
function calendar_isLeapYear(year)
{
	"use strict";
	var isLeap = false;
	if (1
		&& ((year % 4) === 0)
		&& ((year % 100) !== 0)
		|| ((year % 400) === 0)
	) {
		isLeap = true;
	}
	return isLeap;
}

function calendar_getYearDaysCount(year)
{
	"use strict";
	return calendar_isLeapYear(year) ? 366: 365;
}

function calendar_buildMonthTable(Y)
{
	"use strict";
	var M;
	M = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (calendar_isLeapYear(Y)) {
		M[1] += 1;
	}
	return M;
}

/* B.C.E. is the inverse function of C.E.
 *
 * Read first the comments of the C.E. function to better understand how B.C.E.
 * is inversed.
 * */
function calendar_abstractWeekDayNumberBCE(d, m, Y)
{
	"use strict";
	var w, M, year, days, offs;
	M = calendar_buildMonthTable(Y);
	/* Reverse months order. */
	M.reverse();
	days = 0;
	offs = 0;
	year = Y - 1;
	while ((year % 4) !== 0) {
		year--;
		offs++;
	}
	year /= 4;
	days = year * ((365 * 3) + 366);
	while (offs--) {
		days += 365;
	}
	/* Inverse months indices.
	 * This part is counter intuitive especially because we have already
	 * reversed the month order. I encourage you to change this and then
	 * run the super tests.
	 * 
	 * So what is happening?
	 * If we change nothing, then:
	 * 0 1 2 3... 11 will be added like this: 11 + 10 + 9... + 0 because we
	 * count in reversed order.
	 * This is bad because we then count the whole year when we just want
	 * to count the days of the first month that is the december.
	 * If we only reverse the months, then we still count the whole year.
	 * If we only inverse the indices, then will count days of januar when
	 * we want to count days of december.
	 * 
	 * This is why the correct solution is to both reverse the month
	 * order and to inverse the indices.
	 *
	 * I could also have just changed the algorithm, but the focal point
	 * of the B.C.E. is that it is the inverse of the C.E. function and
	 * I wanted that fact to be intact.
	 * */
	offs = 11 - m;
	while (offs--) {
		days += M[offs];
	}
	/* Inverse the days added. */
	days += (M[11 - m] - d) + 1;
	/* This part stays the same. */
	offs = parseInt((Y - 1) / 100);
	days += -offs;
	offs = parseInt((Y - 1) / 400);
	days += offs;
	/* This part I can't reason. I initially thought there was only going
	 * to be offset by one because there is only one day
	 * between 1.1.1 C.E and 1.1.1 B.C.E. After outputting the days on the
	 * terminal I saw I needed to add one extra.
	 * */
	days -= 2;
	w = days % 7;
	/* Finally, we inverse the value we got from our taking the mod 7 of
	 * our days because we are counting backwards.
	 * This will change it from 0 1 2 3 4 5 6 to 0 1 2 3 4 5 6
	 * */
	w = 6 - w;
	/* We start counting from -1 so w can be negative resulting in 
	 * positive 7. */
	if (w === 7) {
		w = 0;
	}
	return w;
}

function calendar_abstractWeekDayNumberCE(d, m, Y)
{
	"use strict";
	var M, year, days, offs;
	M = calendar_buildMonthTable(Y);
	days = 0;
	offs = 0;
	/* We count the year from zero. Note that we we also count B.C.E from
	 * zero so:
	 * B.C.E <-...-3 -2 -1 -0 +0 +1 +2 +3...-> C.E.
	 * Observe that  there are two zeroes.
	 * */
	year = Y - 1;
	/* I didn't want to use fractions. This is why I count in chunks of
	 * 4 pieces added together. Three times 365 plus 366.
	 * */
	while ((year % 4) !== 0) {
		year--;
		offs++;
	}
	/* Divide the year into four pieces because we count in chunks of 4.
	 * */
	year /= 4;
	/* Calculate the days by year * chunks. */
	days = year * ((365 * 3) + 366);
	/* Add remainder years. */
	while (offs--) {
		days += 365;
	}
	/* Add the months, the months start with 0. */
	offs = m;
	while (offs--) {
		days += M[offs];
	}
	/* Add the days, they start normally with 1. */
	days += d;
	/* Each 100 years is not a leap year. Subtract each one. */
	offs = parseInt((Y - 1) / 100);
	days += -offs;
	/* Each 400 years is a leap year. Add them back. */
	offs = parseInt((Y - 1) / 400);
	days += offs;
	/* Do mod 7 and return the weekday. */
	return days % 7;
}

/*
 * To get B.C.E, then insert Y as negative.
 * To get C.E, then insert Y as positive.
 * */
function calendar_abstractWeekDayNumber(d, m, Y)
{
	"use strict";
	var w, dt;
	dt = calendar_buildMonthTable(Y);
	w = -1;
	if (Y === 0) {
		throw "Year cannot be zero";
	}
	if (m < 0 || m > 11) {
		throw "Invalid month";
	}
	if (d < 1 || d > dt[m]) {
		throw "invalid day";
	}
	if (Y > 0) {
		w = calendar_abstractWeekDayNumberCE(d, m, Y);
	} else  {
		Y *= -1;
		w = calendar_abstractWeekDayNumberBCE(d, m, Y);
	}
	return w;
}
/* }}} */

/* TODO: Make API when finished. */

/*
	Everything below has yet tested with unit tests, they are simply
	tested with integration.
*/

/*
	By defualt, it assumes you are using terminal/console.
	Reason?
		1. Fast integration testing.
		2. It is self documenting.

	The structure might look complicated but the design is actually
	very simple.

	To use, then simply copy everything here to its own webworker.
	Write your code at the bottom and build your display. Don't worry
	about closures because there is no special need for closures when you
	are within a webworker.
	Template and tokens are sent to the webworker along with dates you
	want rendererd.
	Display for the calendar is created and then sent back. You can then
	finalize it for edge cases on the main thread if you need.
*/

/* Display {{{ */

/* Display object. */
function calendar_createDisplayObj(m, y)
{
	"use strict";
	return {
		fmt: "",
		arg: [],
		d: 1,
		m: m,
		y: y
	};
}

/* Defaults are also examples of what you can do. */
function calendar_buildDisplayHead(display, customize)
{
	"use strict";
	var r, m, y;
	m = display.m;
	y = display.y;
	if (customize.head === undefined) {
		// Default.
		display.fmt += "%c";
		display.arg.push(
			"color:green;font-weight:bold"
		);
		display.fmt += "%d %d\n";
		display.arg.push(y);
		display.arg.push(m + 1);
		for (r = 0; r < 7; r += 1) {
			display.fmt += "%s\t";
			display.arg.push(
				calendar_weekDayNumberToString(
					r, {alias:true}
				)
			);
		}
		display.fmt += "\n";
	} else {
		customize.head(display);
	}
	return display;
}

/* func(disp, method) -> func(disp, defaultMethod/obj->customMethod) */
function calendar_display(display, method)
{
	"use strict";
	return method(display);
}

function calendar_buildDisplayMonthPreDays(display, customize)
{
	"use strict";
	calendar_display(
		display,
		function (display) {
			if (customize.pre === undefined) {
				/* Default config. */
				display.fmt += "%c%d\t";
				display.arg.push("color:yellow");
				display.arg.push(display.d);
			} else {
				customize.pre(display);
			}
		} 
	);
}

function calendar_buildDisplayMonthDays(display, customize)
{
	"use strict";
	calendar_display(
		display,
		function (display) {
			if (customize.days === undefined) {
				/* Default config. */
				display.fmt += "%c%d\t";
				display.arg.push("color:blue");
				display.arg.push(display.d);
			} else {
				customize.days(display);
			}
		}
	);
}

function calendar_buildDisplayMonthPostDays(display, customize)
{
	"use strict";
	calendar_display(
		display,
		function (display) {
			if (customize.post === undefined) {
				/* Default config. */
				display.fmt += "%c%d\t";
				display.arg.push("color:yellow");
				display.arg.push(display.d);
			} else {
				customize.post(display);
			}
		}
	);
}

function calendar_buildDisplayMonth(display, customize)
{
	"use strict";
	var r, c, o, d, m, y, M, firstWeekDay, numberOfDays;
	r = c = 0;
	d = 1;
	m = display.m;
	y = display.y;
	M = calendar_buildMonthTable(y);
	numberOfDays = M[m];
	customize = customize || {};
	firstWeekDay = calendar_abstractWeekDayNumber(1, m, y);
	o = M[m - 1 > -1 ? m - 1 : 11];
	for (c = 0; c < 6; c += 1) {
		for (r = 0; r < 7; r += 1) {
			if (firstWeekDay === r) {
				firstWeekDay = -1;
			} else if (numberOfDays === d - 1) {
				numberOfDays = -1;
			}
			if (d === M[m] + 1) {
				d = 1;
			}
			if (firstWeekDay > 0) {
				o++;
				display.d = (o - firstWeekDay);
				calendar_buildDisplayMonthPreDays(
					display, customize
				);
				/* Before*/
			} else if (numberOfDays > 0) {
				display.d = d;
				calendar_buildDisplayMonthDays(
					display, customize
				);
				d++;
			} else {
				display.d = d;
				calendar_buildDisplayMonthPostDays(
					display, customize
				);
				d++;
			}
		}
		if (typeof document === "undefined") {
			display.fmt += "\n";
		}
	}
	return display;
}

function calendar_parseTemplate(templ, token, force)
{
	"use strict";
	var i, parsed, msg;
	if (!Array.isArray(token)) {
		throw "token is not array.";
	}
	if (typeof templ !== 'string' && !(templ instanceof String)) {
		throw "templ is supposed to be a string.";
	}
	if (!force && templ === "") {
		 msg = [
			"You are attempting to parse an empty string.\n",
			"Use calendar_parseTemplate(templ, token, *true*) ",
			"or calendar_setup(templ, tokens, *true*) ",
			"to shut down this error and to let the function ",
			"return empty string instead."
		];
		throw msg.join("");
	}
	parsed = templ;
	if (parsed !== "") {
		for (i = 0; i < token.length; i += 1) {
			parsed = parsed.replace(token[i].key, token[i].val);
		}
	}
	return parsed;
}

function calendar_countTokens(template, token)
{
	"use strict";
	return template.split(token).length - 1;
}

/* TODO: Add more features such as buttons. */

/* Here I give meaning to %y, %m and %d. */
function calendar_setup(obj)
{
	"use strict";
	if (!(obj instanceof Object)) {
		throw "Invalid argument.";
	}
	var f = obj.force || false;
	var config = {
		head: function(display) {
			var templ, cm, cy;
			templ = calendar_parseTemplate(
				obj.head.templ, obj.head.tokens, f
			);
			cm = calendar_countTokens(templ, "%m");
			cy = calendar_countTokens(templ, "%y");
			if (cm > 0) {
				templ = templ.replace(/%m/g, display.m + 1);
			}
			if (cy > 0) {
				templ = templ.replace(/%y/g, display.y);
			}
			display.fmt += templ;
		},
		/* Calendar body. */
		/* TODO: Implement the rest. */
		pre: {},
		post: {},
		days: {}
		/* TODO: buttons */
	};
	return config;
}
/* }}} */

/* Remove this? */
function calendar_weekDayNumberToString(w, conf)
{
	"use strict";
	var day, days, lang, src, alias;
	/* Default days. */
	days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wendesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	lang  = conf !== undefined ? conf.lang  : "en";
	src   = conf !== undefined ? conf.src   : "";
	alias = conf !== undefined ? conf.alias : true;
	/* TODO: Handle request for other languages here. */
	if (alias) {
		day = days[w].substring(0, 3);
	} else {
		day = days[w];
	}
	return day;
}

/*TODO: later {{{ */
/*
var calendar_api = {
	public: {
		setup: calendar_setup,
		display: {
			object: calendar_createDisplayObj,
			head: calendar_buildDisplayHead,
			body: calendar_buildDisplayMonth
		},
		toString: function (d, m, dataFromMainThread) {
			var display, data;
			data = dataFromMainThread || {
				head: {
					templ: "",
					tokens: [],
					f: false,
					m: 0,
					y: 2016
				} // etc
			};
			display = calendar_createDisplayObj(data.m, data.y);
			display = calendar_buildDisplayHead(
				display, calendar_setup(instructions)
			);
			display = calendar_buildDisplayMonth(
				display, calendar_setup(instructions)
			);
			return sprintf(display.fmt, display.arg);
		}
	}
};
*/
/* }}} */
