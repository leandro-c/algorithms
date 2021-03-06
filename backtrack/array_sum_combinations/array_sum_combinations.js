"use strict"
// sigh JS ...

function* product(head, ...tail) {
  const remaining = tail.length > 0 ? product(...tail) : [[]]
  for (let r of remaining) for (let h of head) yield [h, ...r]
}

function Counter(iterable) {
  const hmap = new Map()
  for (let el of iterable) {
    hmap.set(el, (hmap.get(el) || 0) + 1)
  }
  return hmap
}

const sum = iterable => iterable.reduce((pv, cv) => pv + cv)
const range = upto => Array.from(Array(upto).keys())

function* sum_combinations(target, ...arrs) {
  const last = arrs[arrs.length - 1]
  const rest = arrs.slice(0, -1)
  const counter_last = new Counter(last)
  for (let combination of product(...rest)) {
    const difference = target - sum(combination)
    if (counter_last.has(difference)) {
      for (let repeated of range(counter_last.get(difference))) {
        yield combination.concat(difference)
      }
    }
  }
}

const A = [1, 2, 3, 3]
const B = [2, 3, 3, 4]
const C = [1, 2, 2, 2]
const target = 7

for (let combination of sum_combinations(target, A, B, C)) {
  console.log(combination)
}
