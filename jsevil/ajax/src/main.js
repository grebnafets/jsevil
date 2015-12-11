/* jshint laxbreak:true */
/* global XMLHttpRequest:true, STATE_OK, STATUS_OK */

/*
 * Default behavior is sending request in sync. Otherwise the function is
 * not going to return requested data.
 * */

function request(obj)
{
	"use strict";
	var http, type, path, data, body, sync, head, cack;
	http = new XMLHttpRequest();
	type = obj.type || "POST";
	path = obj.path || "";
	body = obj.body || null;
	head = obj.head || [];
	sync = obj.sync || true;
	cack = obj.cack || null;
	data = null;
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
	del();
	get();
	post();
	put();
	asyncModule();
}
