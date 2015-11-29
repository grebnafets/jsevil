/* global test, printf, __test_show_failure:true, __test_show_success:true */
__test_show_failure = true;
__test_show_success = true;
printf("%cthis is demo script", "color:green");
test(1 === 1);
test(10 === 2);

if ("content" in document.createElement("template")) {

	var d = document.getElementById("demo-template");
	d.innerHTML = "template stuff";
	var clone = document.importNode(d.content, true);
	document.body.appendChild(clone);
}
