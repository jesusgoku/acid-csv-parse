import path from 'path';

import { readFileAsync } from './utils/fs';
import { parseCSV } from './utils/csv';

(async () => {
  const sourcePath = path.join(__dirname, '../data/comunas.csv');

  const removeQuotes = field => field.replace(/^["']|["']$/gm, '');
  const lineToSubRegion = ([commerceId, commerceParentId, parentId, active, id, name, field1, optCounter, xCiudadId, lat, lng]) => ({
    id,
    name,
    lat: Number(lat),
    lng: Number(lng),
    parentId,
    commerceId,
    commerceParentId,
  });

  const content = parseCSV(String(await readFileAsync(sourcePath)), {
    extraFieldParsers: [removeQuotes],
    extraLineParsers: [lineToSubRegion],
    stripHeaders: true,
  });

  console.log(JSON.stringify(content, null, 2));
})();
