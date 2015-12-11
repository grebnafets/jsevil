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
 if (Array.isArray(arguments[1])) {
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
function stateno_trigger(stateno, id, args)
{
 "use strict";
 var out = null;
 if (typeof stateno.handle === "function") {
  out = stateno.handle(stateno.states[id], args);
 }
 return out;
}
function stateno_set(stateno, state, args)
{
 "use strict";
 var out = null;
 stateno.state = state;
 stateno.bad = stateno.states[state].bad;
 if (stateno.autoTrigger) {
  out = stateno_trigger(stateno, state, args);
 }
 return out;
}
function stateno_clear(stateno)
{
 "use strict";
 stateno.state = 0;
 stateno.bad = false;
}
function __statenoUnusedFalse()
{
 "use strict";
 Stateno();
 stateno_create();
 stateno_trigger();
 stateno_set();
 stateno_clear();
}
if (false) {
 __statenoUnusedFalse();
}
var calendar_state = new Stateno(null);
var CALENDAR_YEAR_ZERO = stateno_create(
 calendar_state, "There is no year 0.", true
);
function calendar_isLeapYear(year)
{
 "use strict";
 var isLeap = false;
 if (1
  && ((year % 4) === 0)
  && ((year % 100) !== 0)
  || ((year % 400) === 0)
 ) {
  isLeap = true;
 }
 return isLeap;
}
function calendar_getYearDaysCount(year)
{
 "use strict";
 return calendar_isLeapYear(year) ? 366: 365;
}
function calendar_buildMonthTable(Y)
{
 "use strict";
 var M;
 M = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 if (calendar_isLeapYear(Y)) {
  M[1] += 1;
 }
 return M;
}
function calendar_abstractWeekDayNumberBCE(d, m, Y)
{
 "use strict";
 var w, M, year, days, offs;
 M = calendar_buildMonthTable(Y);
 M.reverse();
 days = 0;
 offs = 0;
 year = Y - 1;
 while ((year % 4) !== 0) {
  year--;
  offs++;
 }
 year /= 4;
 days = year * ((365 * 3) + 366);
 while (offs--) {
  days += 365;
 }
 offs = 11 - m;
 while (offs--) {
  days += M[offs];
 }
 days += (M[11 - m] - d) + 1;
 offs = parseInt((Y - 1) / 100);
 days += -offs;
 offs = parseInt((Y - 1) / 400);
 days += offs;
 days -= 2;
 w = days % 7;
 w = 6 - w;
 if (w === 7) {
  w = 0;
 }
 return w;
}
function calendar_abstractWeekDayNumberCE(d, m, Y)
{
 "use strict";
 var M, year, days, offs;
 M = calendar_buildMonthTable(Y);
 days = 0;
 offs = 0;
 year = Y - 1;
 while ((year % 4) !== 0) {
  year--;
  offs++;
 }
 year /= 4;
 days = year * ((365 * 3) + 366);
 while (offs--) {
  days += 365;
 }
 offs = m;
 while (offs--) {
  days += M[offs];
 }
 days += d;
 offs = parseInt((Y - 1) / 100);
 days += -offs;
 offs = parseInt((Y - 1) / 400);
 days += offs;
 return days % 7;
}
function calendar_abstractWeekDayNumber(state, d, m, Y)
{
 "use strict";
 var w;
 w = -1;
 if (Y === 0) {
  stateno_set(state, CALENDAR_YEAR_ZERO);
 } else {
  if (Y > 0) {
   w = calendar_abstractWeekDayNumberCE(d, m, Y);
  } else {
   Y *= -1;
   w = calendar_abstractWeekDayNumberBCE(d, m, Y);
  }
 }
 return w;
}
function calendar_display(display, terminal, dom)
{
 "use strict";
 var res = null;
 if (typeof document === "undefined") {
  if (terminal !== undefined || terminal !== null) {
   res = terminal(display);
  }
 } else {
  if (dom !== undefined || dom !== null) {
   res = dom(display);
  }
 }
 return res;
}
function calendar_buildDisplayMonthHead(state, display, m, y, customize)
{
 "use strict";
 var r;
 calendar_display(
  display,
  function (display) {
   if (customize.head === undefined) {
    display.fmt += "%c";
    display.arg.push(
     "color:green;font-weight:bold"
    );
    display.fmt += "%d %d\n";
    display.arg.push(display.y);
    display.arg.push(display.m + 1);
    for (r = 0; r < 7; r += 1) {
     display.fmt += "%s\t";
     display.arg.push(
      calendar_weekDayNumberToString(
       r, {alias:true}
      )
     );
    }
    display.fmt += "\n";
   } else {
    customize.head.terminal(display);
   }
  },
  null
 );
}
function calendar_buildDisplayMonthPreDays(state, display, customize)
{
 "use strict";
 calendar_display(
  display,
  function (display) {
   if (customize.pre === undefined) {
    display.fmt += "%c%d\t";
    display.arg.push("color:yellow");
    display.arg.push(display.d);
   } else {
    customize.pre.terminal(display);
   }
  },
  null
 );
}
function calendar_buildDisplayMonthDays(state, display, customize)
{
 "use strict";
 calendar_display(
  display,
  function (display) {
   if (customize.days === undefined) {
    display.fmt += "%c%d\t";
    display.arg.push("color:blue");
    display.arg.push(display.d);
   } else {
    customize.days.terminal(display);
   }
  },
  null
 );
}
function calendar_buildDisplayMonthPostDays(state, display, customize)
{
 "use strict";
 calendar_display(
  display,
  function (display) {
   if (customize.post === undefined) {
    display.fmt += "%c%d\t";
    display.arg.push("color:yellow");
    display.arg.push(display.d);
   } else {
    customize.post.terminal(display);
   }
  },
  null
 );
}
function calendar_buildDisplayMonth(state, m, y, customize)
{
 "use strict";
 var r, c, o, d, M, firstWeekDay, numberOfDays, display;
 customize = customize || {};
 M = calendar_buildMonthTable(y);
 firstWeekDay = calendar_abstractWeekDayNumber(state, 1, m, y);
 numberOfDays = M[m];
 r = c = 0;
 d = 1;
 display = {
  fmt: "",
  arg: [],
  d: 1,
  m: m,
  y: y
 };
 o = M[m - 1 > -1 ? m - 1 : 11];
 calendar_buildDisplayMonthHead(state, display, m, y, customize);
 for (c = 0; c < 6; c += 1) {
  for (r = 0; r < 7; r += 1) {
   if (firstWeekDay === r) {
    firstWeekDay = -1;
   } else if (numberOfDays === d - 1) {
    numberOfDays = -1;
   }
   if (d === M[m] + 1) {
    d = 1;
   }
   if (firstWeekDay > 0) {
    o++;
    display.d = (o - firstWeekDay);
    calendar_buildDisplayMonthPreDays(
     state, display, customize
    );
   } else if (numberOfDays > 0) {
    display.d = d;
    calendar_buildDisplayMonthDays(
     state, display, customize
    );
    d++;
   } else {
    display.d = d;
    calendar_buildDisplayMonthPostDays(
     state, display, customize
    );
    d++;
   }
  }
  if (typeof document === "undefined") {
   display.fmt += "\n";
  }
 }
 return display;
}
function calendar_weekDayNumberToString(w, conf)
{
 "use strict";
 var day, days, lang, src, alias;
 days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday"
 ];
 lang = conf !== undefined ? conf.lang : "en";
 src = conf !== undefined ? conf.src : "";
 alias = conf !== undefined ? conf.alias : true;
 if (alias) {
  day = days[w].substring(0, 3);
 } else {
  day = days[w];
 }
 return day;
}
if (false) {
 calendar_isLeapYear();
 calendar_getYearDaysCount();
 calendar_abstractWeekDayNumber();
 calendar_weekDayNumberToString();
 calendar_abstractWeekDayNumberCE();
 calendar_abstractWeekDayNumberBCE();
 calendar_buildDisplayMonth();
}
var showme = calendar_buildDisplayMonth(calendar_state, 11, 2015);
var args = [showme.fmt];
args = args.concat(showme.arg);
printf.apply(null, args);
