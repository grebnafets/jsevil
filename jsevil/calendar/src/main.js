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


function calendar_abstractWeekDayNumberRaw(d, m, Y)
{
	"use strict";
	var i, M, fhy, y, w;
	M = calendar_buildMonthTable(Y);
	/* 
	 * Its MAGIC! No, it is actually very simple. Buy me a beer and I might
	 * explain this number to you.
	 * */
	fhy = 146096.8796;
	y = Y / 400;
	if (y > 0) {
		w = 6 + (y * fhy);
	} else {
		y *= -1;
		w = 5 + (y * fhy);
	}
	w += d;
	for (i = 0; i < m; i += 1) {
		w += M[i];
	}
	w = Math.round(w % 7, 10);
	if (w === 7) {
		w = 0;
	}
	return Math.round(w % 7, 10);
}

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
		w = calendar_abstractWeekDayNumberRaw(d, m, Y);
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
}
