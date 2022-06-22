import { Map, is } from 'immutable';

const areMapsEqual = (map1, map2) => is((Map(map1)), (Map(map2)));

export default areMapsEqual;
