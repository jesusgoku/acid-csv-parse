import path from 'path';

import { readFileAsync } from './utils/fs';
import { parseCSV } from './utils/csv';

(async () => {
  const sourcePath = path.join(__dirname, '../data/localidades.csv');

  const removeQuotes = field => field.replace(/^["']|["']$/gm, '');
  const lineToSubRegion = ([commerceId, commerceParentId, name]) => ({
    commerceId,
    commerceParentId,
    name,
  });

  const content = parseCSV(String(await readFileAsync(sourcePath)), {
    extraFieldParsers: [removeQuotes],
    extraLineParsers: [lineToSubRegion],
    stripHeaders: true,
  });

  console.log(JSON.stringify(content, null, 2));
})();
