export { sort, compare };

/**
 * Sorting for one or more fields
 *
 * @param {Array} collection
 * @param {String[]} fields
 */
function sort(collection, fields = []) {
  return collection.sort((a, b) => {
    if (Array.isArray(fields) && fields.length) {
      return fields.reduce(
        (partial, field) => partial || compare(a[field], b[field]),
        0,
      );
    }

    return compare(a, b);
  });
}

/**
 * Compare two values
 *
 * @param {*} a first value to compare
 * @param {*} b second value to compare
 */
function compare(a, b) {
  return isNaN(+a) ? a.localeCompare(b) : a - b;
}
