/**
 * Apply function in flow
 *
 * @param {Function[]} fns functions to compose
 */
export function flow(fns) {
  return initial => fns.reduce((partial, fn) => fn(partial), initial);
}

/**
 * Apply function in flow from right array item
 *
 * @param {Function[]} fns function to compose
 */
export function flowRight(fns) {
  return flow(fns.slice(0).reverse());
}
