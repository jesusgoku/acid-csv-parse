import path from 'path';

import { readFileAsync } from './utils/fs';
import { parse as parseCSV } from './utils/csv';

(async () => {
  const sourcePath = path.join(__dirname, '../data/localidades.csv');
  const removeQuotes = field => field.replace(/^["']|["']$/gm, '');

  const content = parseCSV(String(await readFileAsync(sourcePath)), {
    extraFieldParsers: [removeQuotes],
    stripHeaders: true,
  });

  console.log(content);
})();
