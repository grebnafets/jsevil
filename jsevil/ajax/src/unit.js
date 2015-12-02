/* global get, post, asyncModule, test, test_show_result */
var data;
data = get("http://localhost:8080");
test(data === "What?");
data = get("http://localhost:8080", "data=macro");
test(data === "polo");

data = post("http://localhost:8080");
test(data === "What?");
data = post("http://localhost:8080", "data=macro", "foobar");
test(data === "polofoobar");

function myAsyncModule1(foo)
{
	"use strict";
	var data, old;
	data = post("http://localhost:8080", "data=macro", foo);
	test(data === "polo" + foo);
	old = data;
	data = get("http://localhost:8080");
	test(data + old === "What?" + old);
}
myAsyncModule1.timeout = 10;

function myAsyncModule2(bar)
{
	"use strict";
	data = post("http://localhost:8080", "data=macro", bar);
	test(data === "polo" + bar);
}

asyncModule(myAsyncModule1, "foo");
asyncModule(myAsyncModule2, "bar");

setTimeout(function () {
	"use strict";
	var data = get("http://localhost:8080/exit");
	test(data === "Shutting down");
	test_show_result();
}, 50);
