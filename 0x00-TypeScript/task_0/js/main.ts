interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}
const student1: Student = {
    firstName: 'Jack',
    lastName: 'Sparow',
    age: 18,
    location: 'london'
}
const student2: Student = {
  firstName: 'Peter',
  lastName: 'Parker',
  age: 19,
  location: 'New york',
};
const studentsList: Array<Student> = [student1, student2];
const table = document.createElement('table');
const tbody = document.createElement('tbody');
document.body.appendChild(table);
table.appendChild(tbody);
for (const student of studentsList) {
    const tr = document.createElement('tr');
    const td_Name = document.createElement('td')
    const td_Location = document.createElement('td');
    td_Name.innerHTML = student.firstName
    td_Location.innerHTML = student.location;
    tr.appendChild(td_Name)
    tr.appendChild(td_Location);
    tbody.appendChild(tr);
}
