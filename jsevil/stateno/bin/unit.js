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
 var res = sprintf.apply(fmt, arguments);
 print(res);
}
if (typeof console !== "undefined") {
 var print = function(msg) {console.log(msg);}
 var printf = function(msg) {
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, arguments);
 }
}
function Stateno(defaultHandle)
{
 "use strict";
 this.state = 0;
 this.bad = false;
 this.states = [];
 this.dump = [];
 this.states.push({id: 0, fmt: "No state", bad: false});
 this.handle = defaultHandle;
 this.autoTrigger = false;
}
function stateno_create(stateno, fmt, bad)
{
 "use strict";
 var id = stateno.states.length;
 stateno.states.push({id: id, fmt: fmt, bad: bad});
 return id;
}
function __statenoUnusedFalse()
{
 "use strict";
 Stateno();
 stateno_create();
}
if (false) {
 __statenoUnusedFalse();
}
var __test_show_success = __test_show_success || false;
var __test_show_failure = __test_show_failure || false;
var __test_show_result = __test_show_result || false;
var __test_count_success = __test_count_success || 0;
var __test_count_total = __test_count_total || 0;
function __test(cond, condstr, line, file)
{
 "use strict";
 var raw, f;
 raw = file.split("/");
 f = raw[raw.length - 1];
 if (cond) {
  if (__test_show_success) {
   printf(
    "%c%d:%s:%s",
    "font-weight:bold;color:green",
    line, condstr, f
   );
  }
  __test_count_success++;
 } else {
  if (__test_show_failure) {
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
__test_show_failure = true;
function defHandle(state, bad, fmt, args)
{
 "use strict";
 printf("%d is %s, %s", state, bad, fmt, args);
}
(function test__Stateno() {
 "use strict";
 var state = new Stateno(defHandle);
 __test(defHandle === state.handle, "defHandle === state.handle", 13, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(state.state === 0, "state.state === NO_STATE", 14, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(state.bad === false, "state.bad === false", 15, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(Array.isArray(state.states), "Array.isArray(state.states)", 16, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(state.states.length === 1, "state.states.length === 1", 17, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(Array.isArray(state.dump), "Array.isArray(state.dump)", 18, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(state.dump.length === 0, "state.dump.length === 0", 19, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(state.autoTrigger === false, "state.autoTrigger === false", 20, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
}());
(function test__stateno_create(){
 "use strict";
 var s, THIS, THAT, OTHER;
 s = new Stateno(defHandle);
 THIS = stateno_create(s, "I am %s", true);
 THAT = stateno_create(s, "I am %s", false);
 OTHER = stateno_create(s, "I am %s", true);
 __test(s.states.length === 4, "s.states.length === 4", 31, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[0].id === 0, "s.states[NO_STATE].id === NO_STATE", 33, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[THIS].id === THIS, "s.states[THIS].id === THIS", 34, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[THAT].id === THAT, "s.states[THAT].id === THAT", 35, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[OTHER].id === OTHER, "s.states[OTHER].id === OTHER", 36, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[0].fmt === "No state", "s.states[NO_STATE].fmt === \"No state\"", 38, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[THIS].fmt === "I am %s", "s.states[THIS].fmt === \"I am %s\"", 39, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[THAT].fmt === "I am %s", "s.states[THAT].fmt === \"I am %s\"", 40, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[OTHER].fmt === "I am %s", "s.states[OTHER].fmt === \"I am %s\"", 41, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[0].bad === false, "s.states[NO_STATE].bad === false", 43, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[THIS].bad === true, "s.states[THIS].bad === true", 44, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[THAT].bad === false, "s.states[THAT].bad === false", 45, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
 __test(s.states[OTHER].bad === true, "s.states[OTHER].bad === true", 46, "/home/mme/ws/js/jsevil/jsevil/stateno/src/unit.js");
}());
test_show_result();
