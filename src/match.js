import { normalize as normalizeString } from './utils/string';

import newRawData from '../data/localidades.json';
import oldRawData from '../data/sub-regions.json';

// console.log('__OLD_LENGTH__', oldRawData.length);
// console.log('__NEW_LENGTH__', newRawData.length);
// console.log('__LENGTH_DIFFERENCE__', newRawData.length - oldRawData.length);

// -- Extract only necesary properties
const oldDataResume = oldRawData.map(({ commerceId, commerceParentId, name, id, parentId }) => ({
  commerceId,
  commerceParentId,
  name,
  id,
  parentId,
}));
// console.log(oldDataResume);

// -- Index old data to commerceId field for quick search
const oldDataIndexByCommerceId = oldDataResume.reduce((index, item) => {
  index[item.commerceId] = item;

  return index;
}, {});
// console.log(oldDataIndexByCommerceId);

// -- Index old data to name field for quick search
const oldDataIndexByName = oldDataResume.reduce((index, item) => {
  index[normalizeString(item.name)] = item;

  return index;
}, {});
// console.log(oldDataIndexByName);

const oldAndNewDataMerged = newRawData.map(newData => {
  let id, name, oldData;

  oldData =
    newData.commerceId in oldDataIndexByCommerceId && oldDataIndexByCommerceId[newData.commerceId];

  if (oldData) {
    (id = oldData.id), (name = oldData.name);
  }

  // -- When not match by index
  if (!oldData) {
    const normalizedName = normalizeString(newData.name.replace(/\(.+\)/gm, ''));
    oldData = normalizedName in oldDataIndexByName && oldDataIndexByName[normalizedName];
    id = oldData && newData.commerceId;
    name = oldData && newData.name.replace(/^.+ (\(.+\))$/, `${oldData.name} $1`);
  }

  return {
    ...oldData,
    ...newData,
    id,
    name,
  };
});
// console.log(oldAndNewDataMerged);
console.log(JSON.stringify(oldAndNewDataMerged, null, 2));
