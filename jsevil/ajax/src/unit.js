/* global get, post, del, put, asyncModule, test, test_show_result */
var data;
data = get("http://localhost:8080", "test");
test(data === "What?get");
data = del("http://localhost:8080", "test");
test(data === "What?del");
data = put("http://localhost:8080", "", "test");
test(data === "What?put");
data = get("http://localhost:8080?test=macro", "test");
test(data === "pologet");
data = post("http://localhost:8080", "", "test");
test(data === "What?post");
data = post("http://localhost:8080?foo=bar&test=macro", "foobar", "test");
test(data === "polopostfoobar");

function myAsyncModule1(foo)
{
	"use strict";
	var data, old;
	data = post("http://localhost:8080?test=macro", foo, "test");
	test(data === "polopost" + foo);
	old = data;
	data = get("http://localhost:8080", "test");
	test(data + old === "What?get" + old);
}
myAsyncModule1.timeout = 10;

function myAsyncModule2(bar)
{
	"use strict";
	data = post("http://localhost:8080?test=macro", bar, "test");
	test(data === "polopost" + bar);
}

asyncModule(myAsyncModule1, "foo");
asyncModule(myAsyncModule2, "bar");

setTimeout(function () {
	"use strict";
	var data = get("http://localhost:8080/exit");
	test(data === "Shutting down");
	test_show_result();
}, 50);
