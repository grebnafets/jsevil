/* global Stateno, stateno_create, stateno_trigger, stateno_set, stateno_clear */
/* global printf */
/* jshint unused:false */

/* This is example of creating API using closures. This is done after you
 * know all the members. You might later join with function members from
 * different scope. */

/* (untested) */
function WStateno(defHandle)
{
	"use strict";
	this.stateno = new Stateno(defHandle);
	this.create = function(fmt, bad) {
		stateno_create(this.stateno, fmt, bad);
	};
	this.trigger = function(id, args) {
		stateno_trigger(this.stateno, id, args);
	};
	this.set = function(id, args) {
		stateno_set(this.stateno, id, args);
	};
	this.clear = function() {
		stateno_clear(this.stateno);
	};
	this.is = {
		bad: function() {
			return this.stateno.states[this.stateno.state].bad === true;
		},
		evil: "Well yes, this is JSEvil. Here, have a GOTO sir"
	};
}

/* 
 * The framework is also hackable in a way you can simply wrapp all functions
 * defined.
 * */

