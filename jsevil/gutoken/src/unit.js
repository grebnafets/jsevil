/* global test */
/* global GUToken */

(function test__GUToken() {
	"use strict";
	var tok;
	tok = new GUToken([]);
	test(Array.isArray(tok.type));
	test(tok.type.length === 0);
	test(Array.isArray(tok.data));
	test(tok.data.length === 0);
	test(typeof tok.info === "object");
	test(tok.info.total === 0);
	test(tok.info.defined === 0);
}());
