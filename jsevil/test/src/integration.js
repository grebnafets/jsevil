/* global test, test_show_result, test_clear */

test(1 === 1);
test(10 === 2);

test_show_result();
test_clear();
test_show_result();
test(2 === 10);
test_show_result();
test(true === true);
test_show_result();
var foobar = true;
test(foobar);
test_show_result();
