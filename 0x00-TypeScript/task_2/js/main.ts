interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

class Director implements DirectorInterface {
  workFromHome(): string {
    return 'Working from home';
  }
  getCoffeeBreak(): string {
    return 'Getting a coffee break';
  }
  workDirectorTasks(): string {
    return 'Getting to director tasks';
  }
}

class Teacher implements TeacherInterface {
  workFromHome(): string {
    return 'Cannot work from home';
  }
  getCoffeeBreak(): string {
    return 'Cannot have a break';
  }
  workTeacherTasks(): string {
    return 'Getting to work';
  }
}

interface createEmployeeFunction {
    (salary: string | number): Director | Teacher
}


const createEmployee: createEmployeeFunction = function (salary: number | string) {

    if (typeof salary === 'string') {
      salary = parseInt(salary)
  }
    else if (salary < 500) {
        return new Teacher();
    }
    return new Director();
}

function isDirector(employee: Director | Teacher): employee is Director {
    if (employee instanceof Director) {
        return true;
    }
    return false;
}

function executeWork(employee: Director | Teacher): string {
    if (isDirector(employee)) {
        return employee.workDirectorTasks()
    }
    return employee.workTeacherTasks()
}

console.log(executeWork(createEmployee(200)));
console.log(executeWork(createEmployee(1000)));
