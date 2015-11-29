/* global test, test_show_result, sprintf */
/* global Stateno, stateno_create, stateno_trigger, stateno_set, stateno_clear */
/* global NO_STATE */

function defHandle(state, args)
{
	"use strict";
	var fmt, out;
	out = "";
	/* When this was written, sprintf can only take in array if second
	 * argument is array. Otherwise it will produce unpredicted results. */
	if (args !== undefined) {
		fmt = sprintf(state.fmt, args);
		out = sprintf(
			"%d that is %s says %s", state.id, state.bad, fmt
		);
	} else {
		out = state.fmt;
	}
	return out;
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

(function test__stateno_trigger() {
	"use strict";
	var s, out, THIS, THAT, OTHER;
	s = new Stateno(defHandle);
	THIS  = stateno_create(s, "I am %s and %s", true);
	THAT  = stateno_create(s, "I am %s and %s", false);
	OTHER = stateno_create(s, "I am %s and %s", true);

	out = stateno_trigger(s, THIS, ["this", "one"]);
	test(out === "1 that is true says I am this and one");
	out = stateno_trigger(s, THAT, ["that", "two"]);
	test(out === "2 that is false says I am that and two");
	out = stateno_trigger(s, OTHER, ["other", "three"]);
	test(out === "3 that is true says I am other and three");
}());

(function test__stateno_set() {
	"use strict";
	var s, out, THIS, THAT, OTHER;
	s = new Stateno(defHandle);
	s.autoTrigger = true;
	THIS  = stateno_create(s, "I am %s and %s", true);
	THAT  = stateno_create(s, "I am %s and %s", false);
	OTHER = stateno_create(s, "I am %s and %s", true);

	out = stateno_set(s, THIS, ["this", "one"]);
	test(out === "1 that is true says I am this and one");
	out = stateno_set(s, THAT, ["that", "two"]);
	test(out === "2 that is false says I am that and two");
	out = stateno_set(s, OTHER, ["other", "three"]);
	test(out === "3 that is true says I am other and three");
}());

(function test__stateno_set() {
	"use strict";
	var s, out, THIS, THAT, OTHER;
	s = new Stateno(defHandle);
	s.autoTrigger = true;
	THIS  = stateno_create(s, "foobar", true);
	THAT  = stateno_create(s, "foobar", true);
	OTHER = stateno_create(s, "foobar", true);

	out = stateno_set(s, THIS);
	test(out === "foobar");
	test(s.state === THIS);
	test(s.bad);
	stateno_clear(s);
	test(s.state === NO_STATE);
	test(!s.bad);
	out = stateno_set(s, THAT);
	test(out === "foobar");
	test(s.state === THAT);
	test(s.bad);
	stateno_clear(s);
	test(s.state === NO_STATE);
	test(!s.bad);
	out = stateno_set(s, OTHER);
	test(out === "foobar");
	test(s.state === OTHER);
	test(s.bad);
	stateno_clear(s);
	test(s.state === NO_STATE);
	test(!s.bad);
}());

test_show_result();
