SEARCH_PATH=-I$(JSEVIL_SEARCH_PATH)

CC=gcc $(SEARCH_PATH) -E
COMPILER=$(CC) $(FLAGS)

dirs=demo printf test stateno gutoken ajax calendar

all: $(dirs)

$(dirs): %: ../jsevil/%
	cd $< && $(MAKE)
