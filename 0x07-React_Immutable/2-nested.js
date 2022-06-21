import { fromJS, getIn } from 'immutable';

export default function accessImmutableObject(object, array) {
  const map1 = fromJS(object);
  return getIn(map1, array, undefined);
}
