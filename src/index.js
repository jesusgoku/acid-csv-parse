import path from 'path';

import { readFileAsync } from './utils/fs';
import { parse as parseCSV } from './utils/csv';
import { toStdout } from './utils/output';

const sourcePath = path.join(__dirname, '../data/localidades.csv');

const removeQuotes = field => field.replace(/^["']|["']$/gm, '');

readFileAsync(sourcePath)
  .then(String)
  .then(content => parseCSV(content, { extraFieldParsers: [removeQuotes], stripHeaders: true }))
  .then(toStdout);
