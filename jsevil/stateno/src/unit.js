/* global test, test_show_result, Stateno, stateno_create, printf */
/* global NO_STATE */

function defHandle(state, bad, fmt, args)
{
	"use strict";
	printf("%d is %s, %s", state, bad, fmt, args);
}

(function test__Stateno() {
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

(function test__stateno_create(){
	"use strict";
	var s, THIS, THAT, OTHER;
	s = new Stateno(defHandle);
	THIS  = stateno_create(s, "I am %s", true);
	THAT  = stateno_create(s, "I am %s", false);
	OTHER = stateno_create(s, "I am %s", true);

	test(s.states.length === 4);

	test(s.states[NO_STATE].id === NO_STATE);
	test(s.states[THIS].id === THIS);
	test(s.states[THAT].id === THAT);
	test(s.states[OTHER].id === OTHER);

	test(s.states[NO_STATE].fmt === "No state");
	test(s.states[THIS].fmt === "I am %s");
	test(s.states[THAT].fmt === "I am %s");
	test(s.states[OTHER].fmt === "I am %s");

	test(s.states[NO_STATE].bad === false);
	test(s.states[THIS].bad === true);
	test(s.states[THAT].bad === false);
	test(s.states[OTHER].bad === true);
}());
test_show_result();
