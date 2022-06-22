import { Map } from 'immutable';

export const mergeDeeplyElements = (page1, page2) => {
  if (page1 === page2) {
    return Map.mergeDeep(Map(page2));
  }
  return Map(page1).mergeDeep(Map(page2));
};
