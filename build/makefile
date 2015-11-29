SEARCH_PATH=-I$(JSEVIL_SEARCH_PATH)

CC=gcc $(SEARCH_PATH) -E
COMPILER=$(CC) $(FLAGS)

dirs=demo printf test

all: $(dirs)

$(dirs): %: ../jsevil/%
	cd $< && $(MAKE)
