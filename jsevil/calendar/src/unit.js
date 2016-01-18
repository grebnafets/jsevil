/* global test, testprint:true, test_show_result, test_show_hardcore */
/* global sprintf, calendar_isLeapYear, calendar_getYearDaysCount */
/* global calendar_abstractWeekDayNumber, calendar_buildMonthTable  */
/* global calendar_createDisplayObj, calendar_weekDayNumberToString */

/* Leap Years 1800 - 2400 */
var leapYears1800_2400 = [1804, 1808, 1812, 1816, 1820, 1824, 1828, 1832, 1836, 1840, 1844, 1848, 1852, 1856, 1860, 1864, 1868, 1872, 1876, 1880, 1884, 1888, 1892, 1896, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104, 2108, 2112, 2116, 2120, 2124, 2128, 2132, 2136, 2140, 2144, 2148, 2152, 2156, 2160, 2164, 2168, 2172, 2176, 2180, 2184, 2188, 2192, 2196, 2204, 2208, 2212, 2216, 2220, 2224, 2228, 2232, 2236, 2240, 2244, 2248, 2252, 2256, 2260, 2264, 2268, 2272, 2276, 2280, 2284, 2288, 2292, 2296, 2304, 2308, 2312, 2316, 2320, 2324, 2328, 2332, 2336, 2340, 2344, 2348, 2352, 2356, 2360, 2364, 2368, 2372, 2376, 2380, 2384, 2388, 2392, 2396, 2400];
var nonLeapYears1800_2400 = [];

(function() {
	"use strict";
	var i, len;
	len = leapYears1800_2400.length;
	for (i = 0; i < len; i += 1) {
		nonLeapYears1800_2400[i] = leapYears1800_2400[i] + 1;
	}
}());

function test__calendar_isLeapYear()
{
	"use strict";
	var i, len;
	len = leapYears1800_2400.length;
	for (i = 0; i < len; i += 1) {
		testprint = sprintf("year:%d", leapYears1800_2400[i]);
		test(calendar_isLeapYear(leapYears1800_2400[i]));
	}
	for (i = 0; i < len; i += 1) {
		testprint = sprintf("year:%d", leapYears1800_2400[i]);
		test(!calendar_isLeapYear(nonLeapYears1800_2400[i]));
	}
	testprint = sprintf("year:%d", 100);
	test(!calendar_isLeapYear(100));
	testprint = sprintf("year:%d", 200);
	test(!calendar_isLeapYear(200));
	testprint = sprintf("year:%d", 300);
	test(!calendar_isLeapYear(300));
	testprint = sprintf("year:%d", 400);
	test(calendar_isLeapYear(400));
}

function test__calendar_weekDayNumberToString()
{
	"use strict";
	var conf = {};
	test(calendar_weekDayNumberToString(0, conf) === "Sunday");
	test(calendar_weekDayNumberToString(1, conf) === "Monday");
	test(calendar_weekDayNumberToString(2, conf) === "Tuesday");
	test(calendar_weekDayNumberToString(3, conf) === "Wendesday");
	test(calendar_weekDayNumberToString(4, conf) === "Thursday");
	test(calendar_weekDayNumberToString(5, conf) === "Friday");
	test(calendar_weekDayNumberToString(6, conf) === "Saturday");
	conf.alias = true;
	test(calendar_weekDayNumberToString(0, conf) === "Sun");
	test(calendar_weekDayNumberToString(1, conf) === "Mon");
	test(calendar_weekDayNumberToString(2, conf) === "Tue");
	test(calendar_weekDayNumberToString(3, conf) === "Wen");
	test(calendar_weekDayNumberToString(4, conf) === "Thu");
	test(calendar_weekDayNumberToString(5, conf) === "Fri");
	test(calendar_weekDayNumberToString(6, conf) === "Sat");
}

function test__calendar_getDaysYearCount()
{
	"use strict";
	var i, len;
	len = leapYears1800_2400.length;
	for (i = 0; i < len; i += 1) {
		testprint = sprintf("year:%d", leapYears1800_2400[i]);
		test(calendar_getYearDaysCount(leapYears1800_2400[i] === 366));
	}
	for (i = 0; i < len; i += 1) {
		testprint = sprintf("year:%d", leapYears1800_2400[i]);
		test(calendar_getYearDaysCount(nonLeapYears1800_2400[i] === 365));
	}
}

function test__calendar_semiTest_abstractWeekDaysNumber()
{
	"use strict";
	var i, arbitrary, a;
	arbitrary = [
		{d:28, m:1, y:2015, answ: 6},
		{d:1, m:2, y:2015, answ: 0},
		{d:1, m:11, y:2015, answ: 2},
		{d:2, m:11, y:2015, answ: 3},
		{d:3, m:11, y:2015, answ: 4},
		{d:4, m:11, y:2015, answ: 5},
		{d:5, m:11, y:2015, answ: 6},
		{d:6, m:11, y:2015, answ: 0},

		{d:1, m:0, y:2016, answ: 5},
		{d:2, m:0, y:2016, answ: 6},
		{d:3, m:0, y:2016, answ: 0},
		{d:4, m:0, y:2016, answ: 1},

		{d:1, m:3, y:2016, answ: 5},
		{d:2, m:4, y:2016, answ: 1},
		{d:3, m:7, y:2016, answ: 3},
		{d:4, m:8, y:2016, answ: 0},
		{d:5, m:9, y:2016, answ: 3},
		{d:29, m:1, y:2016, answ: 1},
		{d:1, m:2, y:2016, answ: 2},

		{d:29, m:11, y:-1, answ: 5},
		{d:30, m:11, y:-1, answ: 6},
		{d:31, m:11, y:-1, answ: 0},
		{d:1, m:0, y:1, answ: 1},
		
		{d:1, m:0, y:0, answ: -1}
	];
	a = arbitrary;
	for (i = 0; i < arbitrary.length - 1; i += 1) {
		testprint = sprintf("%d %d %d", a[i].d, a[i].m, a[i].y);
		test(calendar_abstractWeekDayNumber(a[i].d, a[i].m, a[i].y) === a[i].answ);
	}
	testprint = "";
	testprint = sprintf("%d %d %d", a[i].d, a[i].m, a[i].y);
	try {
		var this_should_not_run = 0;
		test(calendar_abstractWeekDayNumber(a[i].d, a[i].m, a[i].y) === a[i].answ);
		test(this_should_not_run);
	} catch (e) {
		var there_is_no_year_zero_thrown = 1;
		test(there_is_no_year_zero_thrown);
	}
	testprint = "";
}

function test__calendar_superTest_abstractWeekDaysNumberCE()
{
	"use strict";
	var i, x, y, m, d, M, arbitrary, a, firstDay;
	// Arbitrary day chosen as anchor.
	x = 4 + 1;
	arbitrary = [];
	for (y = 2015; y > 0; y -= 1) {
		M = calendar_buildMonthTable(y);
		for (m = 11; m > -1; m -= 1) {
			for (d = M[m]; d > 0; d -= 1) {
				x = x === 0 ? 6 : x - 1;
				arbitrary.push({
					d:d, m:m, y:y, answ: x
				});
			}
		}
	}
	a = arbitrary;
	firstDay = a[a.length - 1].d;
	for (i = 0; i < a.length; i += 1) {
		testprint = sprintf(
			"%d %d %d \t %d === %d",
			a[i].d, a[i].m, a[i].y,
			calendar_abstractWeekDayNumber(a[i].d, a[i].m, a[i].y),
		       	a[i].answ
		);
		test(calendar_abstractWeekDayNumber(a[i].d, a[i].m, a[i].y) === a[i].answ);
	}
	testprint = "";
	//printf("First day is: %d", firstDay);
}

function test__calendar_superTest_abstractWeekDaysNumberBCE()
{
	"use strict";
	// Based on above calculations, we calculate B.C.E. the same way
	// using first day as an anchor
	var i, x, y, m, d, M, a, firstDay;
	firstDay = 1;
	x = firstDay;
	firstDay = [];
	for (y = 1; y < 2015; y += 1) {
		M = calendar_buildMonthTable(y);
		for (m = 11; m > -1; m -= 1) {
			for (d = M[m]; d > 0; d -= 1) {
				x = x === 0 ? 6 : x - 1;
				firstDay.push({
					d:d, m:m, y:-y, answ: x
				});
			}
		}
	}
	a = firstDay;
	for (i = 0; i < a.length; i += 1) {
		testprint = sprintf(
			"%d %d %d \t %d === %d",
			a[i].d, a[i].m, a[i].y,
			calendar_abstractWeekDayNumber(a[i].d, a[i].m, a[i].y),
		       	a[i].answ
		);
		test(calendar_abstractWeekDayNumber(a[i].d, a[i].m, a[i].y) === a[i].answ);
	}
	testprint = "";
}

test__calendar_isLeapYear();
test__calendar_getDaysYearCount();
test__calendar_semiTest_abstractWeekDaysNumber();
test__calendar_weekDayNumberToString();

if (test_show_hardcore) {
	test__calendar_superTest_abstractWeekDaysNumberCE();
	test__calendar_superTest_abstractWeekDaysNumberBCE();
}

test_show_result();
