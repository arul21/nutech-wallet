import {isNil} from 'lodash';

export const convertToIdr = num => {
  let balance = '';
  const checkNull = isNil(num) ? 0 : num;
  const numRev = checkNull.toString().split('').reverse().join('');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numRev.length; i++)
    if (i % 3 === 0) balance += `${numRev.substr(i, 3)}.`;
  return `${balance
    .split('', balance.length - 1)
    .reverse()
    .join('')}`;
};
