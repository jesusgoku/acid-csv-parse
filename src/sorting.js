import { sort } from './utils/sorting';

import { stdin, stdout } from 'process';

stdin.resume();
stdin.setEncoding('utf8');

const chunks = [];

stdin.on('data', data => chunks.push(data));

stdin.on('end', () => {
  const inputJSON = chunks.join();
  const parsedData = JSON.parse(inputJSON);
  const communesSorted = sort(parsedData, ['parentId', 'name']);

  stdout.write(JSON.stringify(communesSorted, undefined, 2));
  stdout.write('\n');
});
