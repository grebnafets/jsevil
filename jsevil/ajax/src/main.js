/* jshint laxbreak:true */
/* global XMLHttpRequest:true, printf, STATE_OK, STATUS_OK, InvalidAccessError */

/*
 * These AJAX functions may not work for all user agents.
 * See why within the comments below. (The reason is political)
 *
 * Anyway, this does not prevent me from using these methods from testing
 * server-client relationship within the terminal. I will simply swap these
 * functions later for browser version using "sleep/wait" and DOM as a
 * medium. Not really practical, but what choices am I left with?
 * Callbacks aren't going to help me make unions from different requests if
 * they are async.
 * */

function get(src, command)
{
	"use strict";
	var http, req, data, areYouKiddingMe;
	http = new XMLHttpRequest();
	data = null;
	req  = src;
	http.onreadystatechange = function() {
		if (1
			&& http.readyState === STATE_OK
			&& http.status === STATUS_OK
		) {
			data = http.responseText;
		}
	};
	if (command !== undefined) {
		req += "?" + command;
	}
	try {
		http.open("GET", req, false);
		http.send();
	} catch (e) {
		/* https://xhr.spec.whatwg.org: [
		 * Synchronous XMLHttpRequest outside of workers is in the
		 * process of being removed from the web platform as it has 
		 * detrimental effects to the end user's experience. 
		 * (This is a long process that takes many years.) 
		 * Developers must not pass false for the async argument when 
		 * the JavaScript global environment is a document environment.
		 * User agents are strongly encouraged to warn about such
		 * usage in developer tools and may experiment with throwing 
		 * an InvalidAccessError exception when it occurs.
		 * ]
		 *
		 * This means the programmers of the user agent have to be
		 * _very_ careful how they implement this "feature".
		 *
		 * If they are not careful, they might end up ruining
		 * encapsulation of sync calls within async call.
		 * That is not going to sit well for experienced user of
		 * javaScript API and it is going to be completely backwards
		 * far that user agent!
		 *
		 * Forcing the use of DOM as a medium to union data from
		 * different requests is not ideal approach.
		 * */
		if (e instanceof InvalidAccessError) {
			areYouKiddingMe = "Sorry, I can't give you AJAX";
			areYouKiddingMe += " because the user agent might be misunderstanding";
			areYouKiddingMe += " https://xhr.spec.whatwg.org.";
			areYouKiddingMe += " This misunderstanding is understandible given how";
			areYouKiddingMe += " the specs are unrealistic.";
			areYouKiddingMe += " Hint: If sync request is encapsulated";
			areYouKiddingMe += " within setTimeout then it is async.";
			areYouKiddingMe += " If I was the compiler guy, I would just";
			areYouKiddingMe += " simply ignore this part of the spec.";
			areYouKiddingMe += " It is not up to the compiler guy to decite";
			areYouKiddingMe += " how the API should be used.";
			printf("%s", areYouKiddingMe);
			data = areYouKiddingMe;
		}
	}
	return data;
}

function post(src, command, body)
{
	"use strict";
	var http, req, data, areYouKiddingMe;
	http  = new XMLHttpRequest();
	data  = null;
	req   = src;
	http.onreadystatechange = function() {
		if (1
			&& http.readyState === STATE_OK
			&& http.status === STATUS_OK
		) {
			data = http.responseText;
		}
	};
	if (command !== undefined) {
		req += "?" + command;
	}
	try {
		http.open("POST", req, false);
		http.send(body);
	} catch (e) {
		/* https://xhr.spec.whatwg.org: [
		 * Synchronous XMLHttpRequest outside of workers is in the
		 * process of being removed from the web platform as it has 
		 * detrimental effects to the end user's experience. 
		 * (This is a long process that takes many years.) 
		 * Developers must not pass false for the async argument when 
		 * the JavaScript global environment is a document environment.
		 * User agents are strongly encouraged to warn about such
		 * usage in developer tools and may experiment with throwing 
		 * an InvalidAccessError exception when it occurs.
		 * ]
		 *
		 * This means the programmers of the user agent have to be
		 * _very_ careful how they implement this "feature".
		 *
		 * If they are not careful, they might end up ruining
		 * encapsulation of sync calls within async call.
		 * That is not going to sit well for experienced user of
		 * javaScript API and it is going to be completely backwards
		 * far that user agent!
		 *
		 * Forcing the use of DOM as a medium to union data from
		 * different requests is not ideal approach.
		 * */
		if (e instanceof InvalidAccessError) {
			areYouKiddingMe = "Sorry, I can't give you AJAX";
			areYouKiddingMe += " because the user agent might be misunderstanding";
			areYouKiddingMe += " https://xhr.spec.whatwg.org.";
			areYouKiddingMe += " This misunderstanding is understandible given how";
			areYouKiddingMe += " the specs are unrealistic.";
			areYouKiddingMe += " Hint: If sync request is encapsulated";
			areYouKiddingMe += " within setTimeout then it is async.";
			areYouKiddingMe += " If I was the compiler guy, I would just";
			areYouKiddingMe += " simply ignore this part of the spec.";
			areYouKiddingMe += " It is not up to the compiler guy to decite";
			areYouKiddingMe += " how the API should be used.";
			printf("%s", areYouKiddingMe);
			data = areYouKiddingMe;
		}
	}
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
