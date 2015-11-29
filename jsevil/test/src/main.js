/* global printf  */
/* jshint unused: false */

var __test_show_success = __test_show_success || false;
var __test_show_failure = __test_show_failure || false;
var __test_show_result = __test_show_result || false;
var __test_count_success = __test_count_success || 0;
var __test_count_total = __test_count_total || 0;

function __test(cond, condstr, line, file)
{
	"use strict";
	if (cond) {
		if (__test_show_success) {
			printf(
				"%c%d:%s:%s",
				"font-weight:bold;color:green",
				line, condstr, file
			);
		}
		__test_count_success++;
	} else {
		if (__test_show_failure) {
			printf(
				"%c%d:%s:%s",
				"font-weight:bold;color:red",
				line, condstr, file
			);
		}
	}
	__test_count_total++;
}

function test_clear()
{
	"use strict";
	__test_count_success = 0;
	__test_count_total = 0;
}

function test_show_result()
{
	"use strict";
	var p;
	if (__test_count_total > 0) {
		p = (__test_count_success / __test_count_total) * 100;
	}
	if (__test_show_result) {
		printf(
			"%cTest passed: %c%.2f%",
			"font-weight:bold;color:blue",
			"color:purple",
			p
		);	
	}
}
