"use strict";
/// <reference path="./subjects/Subject.ts" />
/// <reference path="./subjects/Cpp.ts" />
/// <reference path="./subjects/Java.ts" />
/// <reference path="./subjects/React.ts" />
/// <reference path="./subjects/Teacher.ts" />
exports.__esModule = true;
exports.cpp = new Subjects.Cpp();
exports.java = new Subjects.Java();
exports.react = new Subjects.React();
exports.cTeacher = {
    firstName: 'best',
    lastName: 'teacher',
    experienceTeachingC: 10
};
console.log("C++");
exports.cpp.setTeacher = exports.cTeacher;
console.log(exports.cpp.getRequirements());
console.log(exports.cpp.getAvailableTeacher());
console.log("Java");
exports.java.setTeacher = exports.cTeacher;
console.log(exports.java.getRequirements());
console.log(exports.java.getAvailableTeacher());
console.log("React");
exports.react.setTeacher = exports.cTeacher;
console.log(exports.react.getRequirements());
console.log(exports.react.getAvailableTeacher());
