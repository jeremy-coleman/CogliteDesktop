// https://github.com/btford/compose-identity/blob/master/src/index.js
//const composeMap : WeakMap<Function, WeakMap<Function, Function>> = new WeakMap();

const composeMap = new WeakMap();

export function compose<T1, T2, T3>(
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3
): (arg: T1) => T3 {
  const firstLevelCacheHit = composeMap.get(fn1);
  if (firstLevelCacheHit) {
    const secondLevelCacheHit = firstLevelCacheHit.get(fn2);
    if (secondLevelCacheHit) {
      return secondLevelCacheHit;
    }
    const composedFn = (arg) => fn2(fn1(arg));
    firstLevelCacheHit.set(fn2, composedFn);
    return composedFn;
  }

  const composedFn = (arg) => fn2(fn1(arg));
  const secondLevelCache = new WeakMap();
  secondLevelCache.set(fn2, composedFn);
  composeMap.set(fn1, secondLevelCache);
  return composedFn;
}