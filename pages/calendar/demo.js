/* global printf, calendar_state, calendar_buildDisplayMonth */

var showme = calendar_buildDisplayMonth(calendar_state, 11, 2015);
var args = [showme.fmt];
args = args.concat(showme.arg);
printf.apply(null, args);
