/**
 * Apply trim to string
 *
 * @param {String} field
 */
function fieldTrim(field) {
  return field.trim();
}

/**
 * Parse field of CSV file
 *
 * @param {String} field
 * @param {Object} options
 */
function parseField(field, { extraFieldParsers = [] } = {}) {
  return [fieldTrim, ...extraFieldParsers].reduce((partial, fn) => fn(partial), field);
}

/**
 * Parse line of CSV file
 *
 * @param {String} line
 * @param {Object} options
 * @param {String|RegExp} options.fieldSeparator
 */
function parseLine(line, { fieldSeparator = ',', ...options } = {}) {
  return line.split(fieldSeparator).map(field => parseField(field, options));
}

/**
 * Parse CSV File
 *
 * @param {String} contents
 * @param {Object} options
 * @param {String|RegExp} options.lineSeparator
 * @param {Boolean} options.stripHeaders
 * @param {String|RegExp} options.fieldSeparator
 * @param {Function[]} options.extraFieldParsers
 */
export function parse(
  content,
  { lineSeparator = /\n|\r\n|\r/, stripHeaders = false, ...options } = {},
) {
  return content
    .split(lineSeparator)
    .slice(stripHeaders ? 1 : 0)
    .map(line => parseLine(line, options));
}
