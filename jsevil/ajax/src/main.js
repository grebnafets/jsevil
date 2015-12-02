/* jshint laxbreak:true */
/* global XMLHttpRequest:true, STATE_OK, STATUS_OK */

/*
 * These AJAX functions may not work for all user agents because the specs
 * don't favor sync requests.
 *
 * Anyway, this does not prevent me from using these methods from testing
 * server-client relationship within the terminal but I am going to have to
 * replace them if sync is considered harmfully inconvenient to the user.
 * */

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
