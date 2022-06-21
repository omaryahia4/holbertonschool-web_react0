import { Map } from 'immutable';

export default function accessImmutableObject (object, array) {
  const map1 = Map(object);
  return map1.getIn(array);
}
