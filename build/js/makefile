SEARCH_PATH=-I$(JSEVIL_SEARCH_PATH)

CC=gcc $(SEARCH_PATH) -E
COMPILER=$(CC)

list=main unit integration

all: $(list) clean

$(list):
	@$(COMPILER) src/$@.h > bin/$@.js 2>.cerr
	@sed -e "s/#.*$$//" bin/$@.js > tmp/rm_square_comment.sed
	@sed -e "/^$$/d" tmp/rm_square_comment.sed > tmp/rm_empty_lines.sed
	@cat tmp/rm_empty_lines.sed > bin/$@.js

clean:
	@rm -f tmp/*.sed

test: $(list) clean
	@js bin/unit.js
