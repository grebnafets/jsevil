/* global XMLHttpRequest:true */
function get(src, command)
{
	"use strict";
	var http, req, data;
	data = null;
	http = new XMLHttpRequest();
	req  = src;
	http.onreadystatechange = function() {
		if (http.readyState === 4 && http.status === 200) {
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

if (false) {
	get();
}
