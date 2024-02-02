"use strict";
exports.__esModule = true;
var Subjects;
(function (Subjects) {
    var Subject = /** @class */ (function () {
        function Subject() {
        }
        Object.defineProperty(Subject.prototype, "setTeacher", {
            set: function (teacher) {
                this.teacher = teacher;
            },
            enumerable: true,
            configurable: true
        });
        return Subject;
    }());
    Subjects.Subject = Subject;
})(Subjects = exports.Subjects || (exports.Subjects = {}));
