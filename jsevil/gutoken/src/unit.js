/* global test */
/* global GUToken, gutoken_put, gutoken_exists */

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

(function test__gutoken_put() {
	"use strict";
	var tok;
	tok = new GUToken({});
	gutoken_put(tok, "foo", {one: "one", two: "two"});
	gutoken_put(tok, "bar", {one: "two", two: "one"});
	test(typeof tok.data.f === "object");
	test(typeof tok.data.fo === "object");
	test(typeof tok.data.foo === "object");
	test(typeof tok.data.b === "object");
	test(typeof tok.data.ba === "object");
	test(typeof tok.data.bar === "object");
	test(tok.data.c === undefined);
	test(tok.data.d === undefined);
	test(tok.data.foo.one === "one");
	test(tok.data.foo.two === "two");
	test(tok.data.bar.one === "two");
	test(tok.data.bar.two === "one");
	test(tok.info.total === 6);
	test(tok.info.defined === 2);
}());

(function test__gutoken_exists() {
	"use strict";
	var tok;
	tok = new GUToken({});
	gutoken_put(tok, "foo", {one: "one", two: "two"});
	gutoken_put(tok, "bar", {one: "two", two: "one"});
	test(gutoken_exists(tok, "f"));
	test(gutoken_exists(tok, "fo"));
	test(gutoken_exists(tok, "foo"));
	test(gutoken_exists(tok, "b"));
	test(gutoken_exists(tok, "ba"));
	test(gutoken_exists(tok, "bar"));
	test(!gutoken_exists(tok, "c"));
	test(!gutoken_exists(tok, "d"));
}());
