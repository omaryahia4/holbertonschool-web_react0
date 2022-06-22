import { Seq } from 'immutable';

const printBestStudents = (obj) => {
  return Seq(obj)
    .filter(x => x.score > 70)
    .map(x => {
      return {
        ...x,
        firstName: x.firstName.charAt(0).toUpperCase() + x.firstName.substring(1),
        lastName: x.lastName.charAt(0).toUpperCase() + x.lastName.substring(1)
      };
    });
};

export default printBestStudents;
