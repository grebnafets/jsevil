#ifndef PRINTF
#define PRINTF 1

#define ESCAPE_PREFIX "\x1b["
#define RESET "0m"
#define BOLD "1m"

#define FOREGROUND "3"
#define BACKGROUND "4"

#define BLACK "0"
#define RED "1"
#define GREEN "2"
#define YELLOW "3"
#define BLUE "4"
#define PURPLE "5"
#define MAGNETA "5"
#define WHITE "7"

#include <jsevil/printf/src/sub/parseStyle.js>
#include <jsevil/printf/src/main.js>
#endif /* PRINTF */
