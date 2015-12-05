/* global test, testprint:true, test_show_result */
/* global sprintf, calendar_isLeapYear, calendar_getYearDaysCount */
/* global calendar_abstractCentury, calendar_abstractYear, calendar_abstractWeekDayNumber  */
/* global calendar_state */

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

(function test__calendar_isLeapYear(){
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
}());

(function test__calendar_getDaysYearCount(){
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
}());

(function test__calendar_abstractWeekDaysNumber(){
	"use strict";
	var i, arbitrary, a, state;
	state = Object.create(calendar_state);
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

		/* 
		 * I don't care what other calculators say about this time.
		 * I am going to be bold and say mine way is right and theirs
		 * is wrong.
		 * */
		{d:29, m:11, y:-1, answ: 5},
		{d:30, m:11, y:-1, answ: 6},
		{d:31, m:11, y:-1, answ: 0},
		{d:1, m:0, y:1, answ: 1},
		
		{d:1, m:0, y:0, answ: -1}
	];
	a = arbitrary;
	for (i = 0; i < arbitrary.length - 1; i += 1) {
		testprint = sprintf("%d %d %d", a[i].d, a[i].m, a[i].y);
		test(calendar_abstractWeekDayNumber(state, a[i].d, a[i].m, a[i].y) === a[i].answ);
	}
	test(!state.bad);
	testprint = sprintf("%d %d %d", a[i].d, a[i].m, a[i].y);
	test(calendar_abstractWeekDayNumber(state, a[i].d, a[i].m, a[i].y) === a[i].answ);
	test(state.bad);
	test(state.states[state.state].fmt === "There is no year 0.");
}());

test_show_result();
