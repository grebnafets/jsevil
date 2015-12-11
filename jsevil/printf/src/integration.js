/* global printf */
var test = [];

test.push(
	function ()
	{
		"use strict";
		var obj = {foo: "foo", bar: "bar"};
		var nil = null;
		printf("%s %s %s", nil, nil);
	}
);
	
	test.push(
	function ()
	{
		"use strict";
		var obj = {foo: "foo", bar: "bar"};
		printf("%s", obj);		
	}
);

test.push(
	function ()
	{
		"use strict";
		printf(
			"%cyellow%cred%cgreen%cblue%cblack%cwhite%cpurple",
			"color:yellow",
			"color:red",
			"color:green;",
			"color:blue",
			"color:black",
			"color:white",
			"color:purple"
		);
	}
);

test.push(
	function ()
	{
		"use strict";
		printf(
			"%cyellow%cred%cgreen%cblue%cblack%cwhite%cpurple",
			"background-color:yellow",
			"background-color:red",
			"background-color:green;",
			"background-color:blue",
			"background-color:black",
			"background-color:white",
			"background-color:purple"
		);
	}
);

test.push(
	function ()
	{
		"use strict";
		printf("%cunsupported", "color:notsupported");
	}		
);
	
test.push(
	function ()
	{
		"use strict";
		printf("%.2foo", 1.123456789);
		printf("%.3", 1.123456789);
		printf("%.4bar", 1.123456789);
		printf("%.5", 1.123456789);
		printf("%.6foo", 1.123456789);
		printf("%.7", 1.123456789);
		printf("%.8bar", 1.123456789);
		printf("%.9", 1.1234567891234);
		printf("%.10foo", 1.1234567891234);
		printf("%.11", 1.1234567891234);
		printf("%.12bar", 1.1234567891234);
	}		
);

test.push(
	function ()
	{
		"use strict";
		printf("%s", "%d==%d", 1, 1);
		printf("%s", "%d==%s", 1, "even more %.2f", 1.123);
		printf(
			"%s",
			"%d==%s",
			1,
			"even more %s",
			".. ugh, now it is just confusing... %d %.2f",
			500,
			0.346);
	}	
);

var i;
for (i = 0; i < test.length; i += 1) {
	test[i]();
}

