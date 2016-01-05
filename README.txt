This is basically a javascript playground to try out something new.

Origionally I just wanted a good framework where I could stitch javaScript
together and maintain them within a terminal with ease.
I didn't know the developers of Node.js have already developed everything I
wanted so today jsevil is now just a wrapper around nodejs.
The only reason why I still use jsevil is because it has a better environment
for macros. (nodejs has potential to use macros, but it is awkward to use.)

Install instructions:
(for linux users.)

What you need is:
 1. Install go programming language to help testing ajax
 2. Install node and npm to help testing ajax
 3. Install gcc or clang (change the makefiles if you use the clang)
 4. For testing it is nice to be able to use python. I think it comes with
	linux by default. Python is currently used as a wrapper for complex
	bash commands.

Create bin and tmp files and src/unit.config.js file for all directories within jsevil directory.
	cd to jsevil directory and run the following within a terminal:
		for D in *; do mkdir ${D}/tmp ${D}/bin; touch ${D}/src/unit.config.js; done
	tmp files are used locally by the makefile for debugging.
	bin file are the javascript files stitched together and ready.
	unit.config.js is used to set the desired test flags.

Install xmlhttprequest with the node package manager.
	npm install -g xmlhttprequest
	If you get an error saying you should try using sudo, don't!
	Tell nodejs to set global configuration locally to you as a user.
	npm config set prefix '~/.npm-packages'

Set environment variables.
	export JSEVIL_SEARCH_PATH=$HOME/[jsevil clone location]
	export NODE_PATH=$HOME/.npm-packages/lib/node_modules

Build go server
	navigate to tools/go/ajaxServer and do "go build" within the terminal.

It is possible to make a script that does all of this for you but I don't
want it to be too easy to begin with.

(for windows users.)
Set up linux within a virtual machine.
Any real windows poweruser does this ;)
