/* global Stateno, stateno_create, stateno_set */
/* jshint laxbreak:true */

/* 
 * Clone this object if you want calendar state to be local within your API.
 * */
var calendar_state = new Stateno(null);
var CALENDAR_YEAR_ZERO = stateno_create(
	calendar_state, "There is no year 0.", true
);

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
	var tm;
	tm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (calendar_isLeapYear(Y)) {
		tm[1] += 1;
	}
	return tm;
}

/* BC is basically inverse function of AD offset by two.
 * Why two? I don't really know.
 *
 * First day in year A.D. is monday. The last day in B.C is thus sunday..
 * To get this right I have to offset by two instead of one. I don't get it.
 *
 * Read first the comments of AD functions to understand this one. */
function calendar_abstractWeekDayNumberBC(d, m, Y)
{
	"use strict";
	var w, M, year, days, offs;
	M = calendar_buildMonthTable(Y);
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
	while (offs) {
		days += 365;
		offs--;
	}
	/* Inverse the months indices.
	 * Add the months, the months start with 11. */
	offs = 11 - m;
	while (offs) {
		days += M[--offs];
	}
	/* Add the days, they start with max(month).
	 * We then inverse the days added. */
	days += (M[11 - m] - d) + 1;
	offs = parseInt((Y - 1) / 100);
	days += -offs;
	offs = parseInt((Y - 1) / 400);
	days += offs;
	/* I can't reason why it is offset by two. One would have been
	 * reasonable... It might have something to do that we start day
	 * count by -1 as of result of this offset instead of 0.
	 * I don't really know. */
	days -= 2;
	/* Finally, we inverse the value we got from our taking the mod 7 of
	 * our days because we are counting backwards. */
	w = days % 7;
	w = 6 - w;
	if (w === 7) {
		w = 0;
	}
	return w;
}

function calendar_abstractWeekDayNumberAD(d, m, Y)
{
	"use strict";
	var M, year, days, offs;
	M = calendar_buildMonthTable(Y);
	days = 0;
	offs = 0;
	/* Unlike other models, the real year is offset by one. In theory this
	 * is written in the year 2014 even if we count it as 2015. Year 1 is
	 * the year 0, but there are two zeros. Positive 0 for AD and
	 * negative 0 for BC. */
	year = Y - 1;
	/* I don't want to use floats so I count in whole chunks of 4 pieces.
	 * This is why I must make sure the year ends with number divisable
	 * by 4. */
	while ((year % 4) !== 0) {
		year--;
		offs++;
	}
	/* Divide the year into four pieces. */
	year /= 4;
	/* Calculate the days by year * chunks. */
	days = year * ((365 * 3) + 366);
	/* Add remainder years which I subtracted earlier. */
	while (offs) {
		days += 365;
		offs--;
	}
	/* Add the months, the months start with 0. */
	offs = m;
	while (offs) {
		days += M[--offs];
	}
	/* Add the days, they start with 1. */
	days += d;
	/* This is one of the interesting part. You need to fix the offset
	 * that happens after each 100 years. */
	offs = parseInt((Y - 1) / 100);
	days += -offs;
	/* You then take one of this offset back for each 400 years. */
	offs = parseInt((Y - 1) / 400);
	days += offs;
	/* There is no need to round because we are not dealing with a
	 * fraction. */
	return days % 7;
}

/*
 * Now you understand why I wanted to get rid of fractions!
 * At some point I gave up reasoning and attempted to hack the solution in.
 * Reality punched me in the nuts and then in the face. It was a K.O.
 * I am an idiot.
 *
 * I am keeping this here as a warning to others to remember the irony that is
 * "days of programming saves hours of thinking". -Unknown.
 *
 * As for the mod 750, I don't know. I somehow managed to by pass errors
 * that should have been reviled earlier at 100th and 400th day and have them
 * revieal them self only at the 750th day... I think this highlights why
 * programmers are generally really scared when something just works out of
 * the blue.
function calendar_abstractWeekDayNumberRawHack(d, m, Y)
{
	"use strict";
	var tmp, o, i, M, r, y, w;
	M = calendar_buildMonthTable(Y);
	r = 365242199;
	y = Y / 1000000;
	// Finding the pattern
	o = 5.81;
	//o = 6;
	if (calendar_isLeapYear(Y)) {
		o = 5.3;
	}
	if (y > 0) {
		w = o + (y * r);
	} else {
		y *= -1;
		w = 5 + (y * r);
	}
if (debug) {
	printf("w % 750 = %d", (w % 750));
}
	tmp = w % 750;
	o = parseInt(tmp, 10);
	if (Math.round(tmp * 100) === 35118) {
		w--;
	} else if (Math.round(tmp * 100) === 35154) {
		w -= 2;
	}

	if (0
		|| o === 312
		|| o === 510
		|| o === 125
		|| o === 86
		|| o === 47
		|| o === 8
		|| o === 719
		|| o === 680
		|| o === 641
		|| o === 602
		|| o === 563
		|| o === 284
		|| o === 649
		|| o === 264
		|| o === 245
		|| o === 610
		|| o === 225
		|| o === 206
		|| o === 571
		|| o === 186
		|| o === 167
		|| o === 532
		|| o === 147
		|| o === 128
		|| o === 493
		|| o === 108
		|| o === 89
		|| o === 454
		|| o === 69
		|| o === 50
		|| o === 15
		|| o === 415
		|| o === 30
		|| o === 11
		|| o === 376
		|| o === 337
		|| o === 298
		|| o === 259
		|| o === 220
		|| o === 181
		|| o === 142
		|| o === 103
		|| o === 64
	) {
		w--;
	} else if (0
		|| o === 418
		|| o === 379
		|| o === 340
		|| o === 301
		|| o === 262
		|| o === 223
		|| o === 184
		|| o === 351
	) {
		w++;
	}

	for (i = 0; i < m; i += 1) {
		w += M[i];
	}
	w += d;
	w = Math.round(w, 10) % 7;
	return w;
}
*/

/*
 * Negative year is BC. Positive is AD.
 * */
function calendar_abstractWeekDayNumber(state, d, m, Y)
{
	"use strict";
	var w;
	w = -1;
	if (Y === 0) {
		stateno_set(state, CALENDAR_YEAR_ZERO);
	} else {
		if (Y > 0) {
			w = calendar_abstractWeekDayNumberAD(d, m, Y);
		} else  {
			Y *= -1;
			w = calendar_abstractWeekDayNumberBC(d, m, Y);
		}
	}
	return w;
}

/* Days in English is fallback behavior. */
function calendar_weekDayNumberToString(w, conf)
{
	"use strict";
	var day, days, lang, src, alias;
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
	/* TODO: Handle request here. */
	if (alias) {
		day = days[w].substring(0, 3);
	} else {
		day = days[w];
	}
	return day;
}

/* jshintUnusedHack */
if (false) {
	calendar_isLeapYear();
	calendar_getYearDaysCount();
	calendar_abstractWeekDayNumberRaw();
	calendar_abstractWeekDayNumber();
	calendar_weekDayNumberToString();
	calendar_abstractWeekDayNumberRawHack();
}
