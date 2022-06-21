import { fromJS } from 'immutable';

export default function accessImmutableObject (object, array) {
  const map1 = fromJS(object);
  return map1.getIn(array);
}
