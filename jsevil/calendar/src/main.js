/* jshint laxbreak:true */

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

function calendar_abstractCentury(Y)
{
	"use strict";
	var c;
	c = 0;
	if (Y > 100) {
		c = parseInt(Y / 100, 10);
	}
	return c;
}

function calendar_abstractYear(Y)
{
	"use strict";
	var y;
	y = Y;
	if (Y > 100) {
		y = parseInt(Y -(calendar_abstractCentury(Y) * 100), 10);
	}
	return y;
}	

/* jshintUnusedHack */
if (false) {
	calendar_isLeapYear();
	calendar_getYearDaysCount();
	calendar_abstractCentury();
	calendar_abstractYear();
}
