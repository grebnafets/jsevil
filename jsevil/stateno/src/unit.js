/* global test, test_show_result, Stateno, printf */
/* global NO_STATE */

function defHandle(state, bad, fmt, args)
{
	"use strict";
	printf("%d is %s, %s", state, bad, fmt, args);
}

(function __stateno_test_Stateno() {
	"use strict";
	var state = new Stateno(defHandle);
	test(defHandle === state.handle);
	test(state.state === NO_STATE);
	test(state.bad === false);
	test(Array.isArray(state.states));
	test(state.states.length === 1);
	test(Array.isArray(state.dump));
	test(state.dump.length === 0);
	test(state.autoTrigger === false);
}());
test_show_result();
