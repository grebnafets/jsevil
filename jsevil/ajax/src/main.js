/* jshint laxbreak:true */
/* global XMLHttpRequest:true, STATE_OK, STATUS_OK */

/*
 * All requests are made in _sync_!
 *
 * This is by design!
 *
 * You don't need the requests to be in async to get async behavior.
 * */

/* 
 * When you need to make request for the main thread, use async and
 * store the contents within the DOM. You can hide the variable with CSS or
 * whatever.
 *
 * If you need to make complex requests for the main thread, encapsulate these
 * request, work with it and then store it to the DOM. This will requre you
 * to implement fallback behavior in case requests are blocked for some reason.
 *
 * I will define fallback behavior native to the functions when it makes
 * sense.
 * */
var GLOBAL_FAKEDOM = {};

function toDomGet(domel, src, command)
{
	"use strict";
}

function toDomPost(domel, src, command, body)
{
	"use strict";
}

function get(src, command)
{
	"use strict";
	var http, req, data;
	http = new XMLHttpRequest();
	data = null;
	req  = src;
	http.onreadystatechange = function() {
		if (1
			&& http.readyState === STATE_OK
			&& http.status === STATUS_OK
		) {
			data = http.responseText;
		}
	};
	if (command !== undefined) {
		req += "?" + command;
	}
	http.open("GET", req, false);
	http.send();
	return data;
}

function post(src, command, body)
{
	"use strict";
	var http, req, data;
	http  = new XMLHttpRequest();
	data  = null;
	req   = src;
	http.onreadystatechange = function() {
		if (1
			&& http.readyState === STATE_OK
			&& http.status === STATUS_OK
		) {
			data = http.responseText;
		}
	};
	if (command !== undefined) {
		req += "?" + command;
	}
	http.open("POST", req, false);
	http.send(body);
	return data;
}

function asyncModule(func)
{
	"use strict";
	var t, args;
	t = func.timeout === undefined ? 1 : func.timeout;
	args = Array.prototype.slice.call(arguments, 1);
	setTimeout(function () {
		func.apply(null, args);
	}, t);
}

if (false) {
	get();
	post();
	asyncModule();
}
