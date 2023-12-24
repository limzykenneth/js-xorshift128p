// Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
// m is basically chosen to be large (as it is the max period)
// and for its relationships to a and c
const m = 4294967296;
// a - 1 should be divisible by m's prime factors
const a = 1664525;
// c and m should be co-prime
const c = 1013904223;
let y2 = 0;
let stateProperty;

function lcgSetSeed() {
  // pick a random seed if val is undefined or null
  // the >>> 0 casts the seed to an unsigned 32-bit integer
  stateProperty = Math.random() * m  >>> 0;
}

function lcg() {
  // define the recurrence relationship
  stateProperty = (a * stateProperty + c) % m;
  // return a float in [0, 1)
  // we've just used % m, so / m is always < 1
  return stateProperty / m;
}

lcgSetSeed();
console.time();

for(let i=0; i<1000000; i++){
  console.log(lcg(stateProperty));
}

console.timeEnd();