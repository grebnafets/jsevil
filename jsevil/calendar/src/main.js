/* jshint laxbreak:true */
function isLeapYear(year)
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

function getYearDaysCount(year)
{
	"use strict";
	return isLeapYear(year) ? 366: 365;
}

/* jshintUnusedHack */
if (false) {
	isLeapYear();
	getYearDaysCount();
}
