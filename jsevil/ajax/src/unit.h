#include <jsevil/ajax/src/main.h>
#include <jsevil/test/src/main.h>
#include <jsevil/ajax/src/unit.config.js>
if (XMLHttpRequest === undefined) {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}
#include <jsevil/ajax/src/unit.js>
