import { List } from 'immutable';

export function getListObject(array) {
  return List(array);
}
export function addElementToList(list, element) {
  return List(list).push(element);
}
