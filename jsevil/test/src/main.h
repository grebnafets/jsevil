#ifndef TEST
#define TEST 1
#include <jsevil/printf/src/main.h>
#include <jsevil/test/src/main.js>
#define test(c) __test(c, #c, __LINE__, __FILE__)
#endif /* TEST */
