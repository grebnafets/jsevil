function printfps_warnUnsupported(val)
{
 "use strict";
 var red, end, err, prefix;
 prefix = "\x1b[";
 red = prefix + "3" + "1" + "m";
 end = prefix + "0m";
 err = red + val + " is unsupported, sorry." + end;
 print(err);
}
function printfps_color(col)
{
 "use strict";
 var res, prefix;
        res = "";
 prefix = "\x1b[";
 switch (col.toLowerCase()) {
 case "yellow":
  res = prefix + "3" + "3" + "m";
  break;
 case "red":
  res = prefix + "3" + "1" + "m";
  break;
 case "green":
  res = prefix + "3" + "2" + "m";
  break;
 case "blue":
  res = prefix + "3" + "4" + "m";
  break;
 case "black":
  res = prefix + "3" + "0" + "m";
  break;
 case "white":
  res = prefix + "3" + "7" + "m";
  break;
 case "purple":
  res = prefix + "3" + "5" + "m";
  break;
 case "magneta":
  res = prefix + "3" + "5" + "m";
  break;
 default:
  printfps_warnUnsupported(col);
  break;
 }
 return res;
}
function printfps_background_color(col)
{
 "use strict";
 var prefix, res;
        res = "";
 prefix = "\x1b[";
 switch (col.toLowerCase()) {
 case "yellow":
  res = prefix + "4" + "3" + "m";
  break;
 case "red":
  res = prefix + "4" + "1" + "m";
  break;
 case "green":
  res = prefix + "4" + "2" + "m";
  break;
 case "blue":
  res = prefix + "4" + "4" + "m";
  break;
 case "black":
  res = prefix + "4" + "0" + "m";
  break;
 case "white":
  res = prefix + "4" + "7" + "m";
  break;
 case "purple":
  res = prefix + "4" + "5" + "m";
  break;
 case "magneta":
  res = prefix + "4" + "5" + "m";
  break;
 default:
  printfps_warnUnsupported(col);
  break;
 }
 return res;
}
function printfps_font_weight(val)
{
 "use strict";
 var res, prefix;
        res = "";
 prefix = "\x1b[";
 if (val === "bold") {
  res = prefix + "1m";
 }
 return res;
}
function printf_parseStyle(style)
{
 "use strict";
 var i, j, prefix, tuble, tubles, res;
 prefix = "\x1b[";
 j = 0;
 res = [];
 tubles = style.split(';');
 for (i = 0; i < tubles.length; i += 1) {
  tuble = tubles[i].split(':');
  switch(tuble[0].trim().toLowerCase()) {
  case "color":
   res[j++] = printfps_color(tuble[1].trim());
   break;
  case "font-weight":
   res[j++] = printfps_font_weight(tuble[1].trim());
   break;
  case "background-color":
   res[j++] = printfps_background_color(tuble[1].trim());
   break;
  default:
   break;
  }
 }
 return res.join('');
}
function sprintf(fmt)
{
 "use strict";
 var args, i, j, k, prefix, res, sub, out, offset, sum, exp, style,
  pre, post;
 res = [];
 sub = {
  s: 0,
  e: 0
 };
 prefix = "\x1b[";
 j = 0;
 k = 1;
 offset = 0;
 style = 0;
 if (typeof arguments[1] === "object") {
  args = arguments[1];
  k = 0;
 } else {
  args = arguments;
  k = 1;
 }
 for (i = 0; i < fmt.length; i += 1) {
  offset = 0;
  switch (fmt[i]) {
  case '%':
   offset++;
   switch (fmt[i + offset]) {
   case 'c':
    offset++;
    res[j++] = fmt.substring(sub.s, sub.e);
    res[j++] = printf_parseStyle(args[k++]);
    sub.s = i + offset;
    style = 1;
    break;
   case 's':
    offset++;
    res[j++] = fmt.substring(sub.s, sub.e);
    sub.s = i + offset;
    pre = fmt.substring(0, sub.s);
    post = fmt.substring(sub.s, fmt.length);
    fmt = pre + args[k++] + post;
    break;
   case '.':
    offset++;
    sum = 0;
    exp = 1;
    while (!isNaN(fmt[i + offset])) {
     if (exp > 100) {
      print("fmt causes overflow");
      return;
     }
     sum *= exp;
     sum += parseInt(fmt[i + offset], 10);
     offset++;
     exp *= 10;
    }
    exp = Math.pow(10, sum);
    res[j++] = fmt.substring(sub.s, sub.e);
    res[j++] = Math.round(
     args[k++] * exp
    ) / exp;
    sum = exp;
    exp = 0;
    while (sum >= 10) {sum /= 10; exp++;}
    res[j - 1] = res[j - 1].toFixed(exp);
    if (fmt[i + offset] === 'f') {
     offset++;
    }
    sub.s = i + offset;
    break;
   case 'd':
    offset++;
    res[j++] = fmt.substring(sub.s, sub.e);
    res[j++] = args[k++];
    sub.s = i + offset;
    break;
   case 'f':
    offset++;
    res[j++] = fmt.substring(sub.s, sub.e);
    res[j++] = args[k++];
    sub.s = i + offset;
    break;
   default:
    break;
   }
   break;
  default:
   break;
  }
  sub.e++;
 }
 res[j++] = fmt.substring(sub.s, sub.e);
 res[j++] = args[k++];
 if (style) {
  res[j++] = prefix + "0m";
  style = 0;
 }
 out = res.join('');
 return out;
}
function printf(fmt)
{
 "use strict";
 var res = sprintf.apply(null, arguments);
 print(res);
}
if (typeof console !== "undefined") {
 var print = function(msg) {console.log(msg);}
}
if (0
 || typeof window !== "undefined"
 || (1
  && typeof WorkerGlobalScope !== "undefined"
  && self instanceof WorkerGlobalScope
 )
) {
 var printf = function(msg) {
  console.log.apply(console, arguments);
 }
}
var __test_show_success = __test_show_success || false;
var __test_show_failure = __test_show_failure || false;
var __test_show_result = __test_show_result || false;
var __test_count_success = __test_count_success || 0;
var __test_count_total = __test_count_total || 0;
var testprint = "";
function __test(cond, condstr, line, file)
{
 "use strict";
 var raw, f;
 raw = file.split("/");
 f = raw[raw.length - 1];
 if (cond) {
  if (__test_show_success) {
   if (testprint.length) {
    printf(testprint);
   }
   printf(
    "%c%d:%s:%s",
    "font-weight:bold;color:green",
    line, condstr, f
   );
  }
  __test_count_success++;
 } else {
  if (__test_show_failure) {
   if (testprint.length) {
    printf(testprint);
   }
   printf(
    "%c%d:%s:%s",
    "font-weight:bold;color:red",
    line, condstr, f
   );
  }
 }
 __test_count_total++;
}
function test_clear()
{
 "use strict";
 __test_count_success = 0;
 __test_count_total = 0;
}
function test_show_result()
{
 "use strict";
 var p;
 if (__test_count_total > 0) {
  p = (__test_count_success / __test_count_total) * 100;
 }
 if (__test_show_result) {
  printf(
   "%cTest passed: %c%.2f%",
   "font-weight:bold;color:blue",
   "color:purple",
   p
  );
 }
}
__test_show_failure = true;__test_show_success = true;__test_show_result = true;
if (XMLHttpRequest === undefined) {
 var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}
function get(src, command)
{
 "use strict";
 var http, req, data;
 http = new XMLHttpRequest();
 data = null;
 req = src;
 http.onreadystatechange = function() {
  if (1
   && http.readyState === 4
   && http.status === 200
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
 req = src;
 http.onreadystatechange = function() {
  if (1
   && http.readyState === 4
   && http.status === 200
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
 get();
 post();
 asyncModule();
}
var data;
data = get("http://localhost:8080");
__test(data === "What?", "data === \"What?\"", 4, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
data = get("http://localhost:8080", "data=macro");
__test(data === "polo", "data === \"polo\"", 6, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
data = post("http://localhost:8080");
__test(data === "What?", "data === \"What?\"", 9, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
data = post("http://localhost:8080", "data=macro", "foobar");
__test(data === "polofoobar", "data === \"polofoobar\"", 11, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
function myAsyncModule1(foo)
{
 "use strict";
 var data, old;
 data = post("http://localhost:8080", "data=macro", foo);
 __test(data === "polo" + foo, "data === \"polo\" + foo", 18, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
 old = data;
 data = get("http://localhost:8080");
 __test(data + old === "What?" + old, "data + old === \"What?\" + old", 21, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
}
myAsyncModule1.timeout = 10;
function myAsyncModule2(bar)
{
 "use strict";
 data = post("http://localhost:8080", "data=macro", bar);
 __test(data === "polo" + bar, "data === \"polo\" + bar", 29, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
}
asyncModule(myAsyncModule1, "foo");
asyncModule(myAsyncModule2, "bar");
setTimeout(function () {
 "use strict";
 var data = get("http://localhost:8080/exit");
 __test(data === "Shutting down", "data === \"Shutting down\"", 38, "/home/mme/ws/js/jsevil/jsevil/ajax/src/unit.js");
 test_show_result();
}, 50);
