import { Seq } from 'immutable';

const printBestStudents = (grades) => {
  return Seq(grades)
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
