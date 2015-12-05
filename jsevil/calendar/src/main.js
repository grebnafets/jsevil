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
	var o, i, M, r, y, w;
	M = calendar_buildMonthTable(Y);
	r = 365242199;
	y = Y / 1000000;
	o = 6;
	/* Finding the pattern */
	switch (Y) {
	case 1984:
	case 1980:
	case 1976:
	case 1972:
	case 1968:
	case 1964:
	case 1960:
	case 1956:
	case 1952:
	case 1951:
	case 1948:
	case 1947:
	case 1944:
	case 1943:
	case 1940:
	      o = 5;
	      break;
	}
	if (y > 0) {
		w = o + (y * r);
	} else {
		y *= -1;
		w = 5 + (y * r);
	}
	for (i = 0; i < m; i += 1) {
		w += M[i];
	}
	w += d;
	w = Math.round(w, 10) % 7;
	return w;
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
