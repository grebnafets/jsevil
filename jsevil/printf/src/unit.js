/* jshint unused:false */
/* global test, test_show_result, sprintf, printf */

var fmt, str;

fmt = "All liquids are %s";
str = sprintf(fmt, "coffee");

test(str === "All liquids are coffee");

test_show_result();
