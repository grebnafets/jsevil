SEARCH_PATH=-I$(JSEVIL_SEARCH_PATH)

CC=gcc $(SEARCH_PATH) -E
COMPILER=$(CC)

all: main clean

main:
	@$(COMPILER) main.h > main.js 2>.cerr
	@sed -e "s/#.*$$//" main.js > tmp/rm_square_comment.sed
	@sed -e "/^$$/d" tmp/rm_square_comment.sed > tmp/rm_empty_lines.sed
	@cat tmp/rm_empty_lines.sed > main.js

clean:
	@rm -f tmp/*.sed
