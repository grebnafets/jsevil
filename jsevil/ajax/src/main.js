/* global STATE_OK, STATUS_OK */
/* exported del, get, post, put, asyncModule, NewAsyncSchedular */
/* exported asyncSchedular */

/*
 * Default behavior is sending request in sync. Otherwise the function is
 * not going to return requested data.
 * */

function request(obj)
{
	"use strict";
	var http, type, path, data, body, sync, head, cack, timo;
	http = new XMLHttpRequest();
	type = obj.type || "POST";
	path = obj.path || "";
	body = obj.body || null;
	head = obj.head || [];
	sync = obj.sync || true;
	cack = obj.cack || null;
	timo = obj.timo || 1000;
	data = null;
	http.timeout = timo;
	http.onreadystatechange = function() {
		if (1
			&& http.readyState === STATE_OK
			&& http.status === STATUS_OK
		) {
			data = http.responseText;
			if (cack !== null) {
				data = cack(data);
			}
		}

	};
	http.ontimeout = function() {
		data = null;
	};
	http.open(type, path, !sync);
	(function (){
		var i, len;
		len = head.length;
		for (i = 0; i < len; i += 1) {
			http.setRequestHeader(head[i].key, head[i].val);
		}
	}());
	http.send(body);
	return data;
}

function get(queryString, token, user)
{
	"use strict";
	var tok, u;
	tok = token || "";
	u   = user || "public"; 
	return request({
		head: [
			{key: "rtype", val: "get"},
			{key: "tok", val: tok},
			{key: "user", val: "public"}
		],
		type: "GET",
		path: queryString,
	});
}

function del(queryString, token, user)
{
	"use strict";
	var tok, u;
	tok = token || "";
	u = user || "public"; 
	return request({
		head: [
			{key: "rtype", val: "del"},
			{key: "tok", val: tok},
			{key: "user", val: "public"}
		],
		type: "GET",
		path: queryString
	});
}


function post(queryString, body, token, user)
{
	"use strict";
	var tok, u;
	tok = token || "";
	u = user || "public"; 
	return request({
		head: [
			{key: "rtype", val: "post"},
			{key: "tok", val: tok},
			{key: "user", val: "public"}
		],
		type: "POST",
		path: queryString,
		body: body
	});
}

function put(queryString, body, token, user)
{
	"use strict";
	var tok, u;
	tok = token || "";
	u = user || "public"; 
	return request({
		head: [
			{key: "rtype", val: "put"},
			{key: "tok", val: tok},
			{key: "user", val: "public"}
		],
		type: "POST",
		path: queryString,
		body: body
	});
}

function NewAsyncSchedular()
{
	"use strict";
	var s = {
		pos: 0,
		callQueue: [],
		interval: 250,
		finish: false
	};
	return s;
}

function asyncSchedularReset(s)
{
	"use strict";
	s.pos       = 0;
	s.callQueue = [];
	s.interval  = 250;
}

function asyncSchedular(s)
{
	"use strict";
	setTimeout(function() {
		if (s.pos < s.callQueue.length) {
			s = s.callQueue[s.pos++](s);
		} else {
			asyncSchedularReset(s);
		}
		if (!s.finish) {
			asyncSchedular(s);
		}
	}, s.interval);
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

