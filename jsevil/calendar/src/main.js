/* global Stateno, stateno_create, stateno_set */
/* jshint laxbreak:true */

/* 
 * Clone this object if you want calendar state to be local in your API.
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
function calendar_abstractWeekDayNumber(state, d, m, Y)
{
	"use strict";
	var w;
	w = -1;
	if (Y === 0) {
		stateno_set(state, CALENDAR_YEAR_ZERO);
	} else {
		if (Y > 0) {
			w = calendar_abstractWeekDayNumberCE(d, m, Y);
		} else  {
			Y *= -1;
			w = calendar_abstractWeekDayNumberBCE(d, m, Y);
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
	calendar_abstractWeekDayNumber();
	calendar_weekDayNumberToString();
	calendar_abstractWeekDayNumberCE();
	calendar_abstractWeekDayNumberBCE();
}
