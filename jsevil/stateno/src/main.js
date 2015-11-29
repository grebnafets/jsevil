/* global NO_STATE */

/*
 * Sateno is used locally because there is no concept of thread local variable
 * in javaScript while you can somewhat hack threads in.
 *
 * I develop using what I call the "post classification pattern".
 * Yeah, it is a buzzword that I came up with in attempt to vocalize what
 * I believe is important for raw development.
 *
 * Post classification contrasts pre classification.
 * Post classification might have problems with namespacing where as pre
 * classification has problems with testing and organizing code.
 * Post classification keeps the structures free from definition where as
 * pre classification clutters structures with definitions.
 * Post classification is reusable where pre classification is not.
 *
 * Think of GO lang as a post classification language where Java is a
 * pre classification language. You can then think of C++, Python and
 * JavaScript as PRE/POST classification agnostic.
 *
 * In short, don't worry about global functions. It is easy to wrapp them all
 * up in any direction later by anyone. Truly bad evils wait once you have
 * invested in direction without knowledge and then it is often too late to
 * go back.
 * */

function Stateno(defaultHandle)
{
	"use strict";
	this.state = NO_STATE;
	this.bad   = false;
	this.states = [];
	this.dump   = [];
	this.states.push({id: 0, fmt: "No state", bad: false});
	/*
	 * defaultHandle takes in:
	 * 	state obj
	 * 	arguments as array
	 * You can use the sprintf function to help you out.
	 * */
	this.handle = defaultHandle;
	this.autoTrigger = false;
}

function stateno_create(stateno, fmt, bad)
{
	"use strict";
	var id = stateno.states.length;
	stateno.states.push({id: id, fmt: fmt, bad: bad});
	return id;
}

function stateno_trigger(stateno, id, args)
{
	"use strict";
	var out = null;
	if (typeof stateno.handle === "function") {
		out = stateno.handle(stateno.states[id], args);
	}
	return out;
}

/* ==============jshint hack================= */
function __statenoUnusedFalse()
{
	"use strict";
	Stateno();
	stateno_create();
	stateno_trigger();
}
if (false) {
	__statenoUnusedFalse();
}
