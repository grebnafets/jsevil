/* global get, test, test_show_result */
var data;
data = get("http://localhost:8080");
test(data === "What?");
data = get("http://localhost:8080", "data=macro");
test(data === "polo");
data = get("http://localhost:8080/exit");
test(data === "Shutting down");

test_show_result();
