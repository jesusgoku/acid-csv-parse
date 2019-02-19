import fs from 'fs';

/**
 * Read file async with Promise API
 *
 * @param {String} filePath
 * @param {String} charset
 */
export function readFileAsync(filePath, charset = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, charset, (err, contents) => {
      if (err) {
        return reject(err);
      }

      return resolve(contents);
    });
  });
}
