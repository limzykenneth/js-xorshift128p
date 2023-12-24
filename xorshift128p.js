// const state = [0, 1, 0, 2];
const state = new Uint32Array(4);
state[0] = (Math.random() * Math.pow(2, 32)) >>> 0;
state[1] = (Math.random() * Math.pow(2, 32)) >>> 0;
state[2] = (Math.random() * Math.pow(2, 32)) >>> 0;
state[3] = (Math.random() * Math.pow(2, 32)) >>> 0;

function xorshift128p(){
	// uint64_t s1 = s[0]
  var s1U = state[0], s1L = state[1];
  // uint64_t s0 = s[1]
  var s0U = state[2], s0L = state[3];

  // result = s0 + s1
  var sumL = (s0L >>> 0) + (s1L >>> 0);
  var resU = (s0U + s1U + (sumL / 2 >>> 31)) >>> 0;
  var resL = sumL >>> 0;

  // s[0] = s0
  state[0] = s0U;
  state[1] = s0L;

  // - t1 = [0, 0]
  var t1U = 0, t1L = 0;
  // - t2 = [0, 0]
  var t2U = 0, t2L = 0;

  // s1 ^= s1 << 23;
  // :: t1 = s1 << 23
  var a1 = 23;
  var m1 = 0xFFFFFFFF << (32 - a1);
  t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
  t1L = s1L << a1;
  // :: s1 = s1 ^ t1
  s1U = s1U ^ t1U;
  s1L = s1L ^ t1L;

  // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
  // :: t1 = s1 ^ s0
  t1U = s1U ^ s0U;
  t1L = s1L ^ s0L;
  // :: t2 = s1 >> 18
  var a2 = 18;
  var m2 = 0xFFFFFFFF >>> (32 - a2);
  t2U = s1U >>> a2;
  t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
  // :: t1 = t1 ^ t2
  t1U = t1U ^ t2U;
  t1L = t1L ^ t2L;
  // :: t2 = s0 >> 5
  var a3 = 5;
  var m3 = 0xFFFFFFFF >>> (32 - a3);
  t2U = s0U >>> a3;
  t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
  // :: t1 = t1 ^ t2
  t1U = t1U ^ t2U;
  t1L = t1L ^ t2L;

  // s[1] = t1
  state[2] = t1U;
  state[3] = t1L;

  // return result
  return [resU, resL];
}

console.time();

for(let i=0; i<100; i++){
	const n = xorshift128p();
	console.log(
		n[0] * 2.3283064365386963e-10 + (n[1] >>> 12) * 2.220446049250313e-16

		// xorshift128p()
		// 	.map((n) => n.toString(16))
		// 	.join("")
	);
}

console.timeEnd();