/* global NO_STATE */

/*
 * Sateno is used locally because there is no concept of thread local variable
 * in javaScript while you can somewhat hack threads in.
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
	 * 	state as number,
	 * 	bad as boolean,
	 * 	format as string,
	 * 	arguments as array
	 * You can use the sprintf function to help you out.
	 * */
	this.handle = defaultHandle;
	this.autoTrigger = false;
}

/* ==============jshint hack================= */
function __statenoUnusedFalse()
{
	"use strict";
	Stateno();
}
if (false) {
	__statenoUnusedFalse();
}
