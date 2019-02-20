import communes from '../data/sub-regions-v2.json';

const communesSorted = communes.sort(
  (a, b) => a.parentId - b.parentId || a.name.localeCompare(b.name),
);

// communesSorted.forEach(commune =>
//   console.log(`${commune.parentId}.- ${commune.name}`),
// );

// console.log(communesSorted);
console.log(JSON.stringify(communesSorted, undefined, 2));
