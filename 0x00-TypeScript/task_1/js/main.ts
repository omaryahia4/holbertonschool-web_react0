import { FlowNode } from "typescript";

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
