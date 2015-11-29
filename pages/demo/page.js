/* global printf */
printf("this is demo script");

if ("content" in document.createElement("template")) {

	var d = document.getElementById("demo-template");
	d.innerHTML = "template stuff";
	var clone = document.importNode(d.content, true);
	document.body.appendChild(clone);
}
