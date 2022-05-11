interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}

interface Directors extends Teacher {
  numberOfReports: number;
}

interface printTeacherFunction {
  (firstName: string, lastName: string): void;
}

const printTeacher: printTeacherFunction = function (firstName: string, lastName: string): void {
  const firstLetter = firstName.charAt(0).toUpperCase();
  console.log(`${firstLetter}. ${lastName}`);
};

printTeacher('john', 'Doe');

interface StudentClassInterface {
  firstName: string;
  lastName: string;
  workOnHomework(): string;
  displayName(): string;
}

interface classConstructor {
  new (firstName: string, lastName: string): StudentClassInterface;
}

class StudentClass implements StudentClassInterface {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  workOnHomework(): string {
    return 'Currently working';
  }

  displayName(): string {
    return this.firstName;
  }
}

const student: StudentClass = new StudentClass('Elon', 'Musk')
console.log(student.workOnHomework());
console.log(student.displayName());
