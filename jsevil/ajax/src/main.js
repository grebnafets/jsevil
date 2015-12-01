/* jshint laxbreak:true */
/* global XMLHttpRequest:true, STATE_OK, STATUS_OK */

/* get and post in sink simply. */

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
	http.open("POST", req, false);
	http.send(body);
	return data;
}

if (false) {
	get();
	post();
}
