#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* The state must be seeded so that it is not everywhere zero. */
uint64_t s[2];

uint64_t xorshift128plus_int(void) {
	uint64_t s1 = s[0];
	const uint64_t s0 = s[1];
	const uint64_t result = s0 + s1;
	s[0] = s0;
	s1 ^= s1 << 23; // a
	s[1] = s1 ^ s0 ^ (s1 >> 18) ^ (s0 >> 5); // b, c
	return result;
}

int main(int argc, char *argv[]) {
	s[0] = 1LL;
	s[1] = 2LL;

	uint64_t length = 10;

	printf("\n");

	for (int i = 0; i < length; i++) {
		printf("%016llX\n", xorshift128plus_int());
	}

	printf("\n");
}